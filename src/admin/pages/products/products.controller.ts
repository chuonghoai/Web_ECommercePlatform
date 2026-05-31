import { useCallback } from 'react';
import { useProductStore } from './products.store';
import { productService } from '../../features/products/services/product.service';
import type { Product, ProductFormData } from '../../features/products/models/product.model';
export const useProductController = () => {
    const store = useProductStore();
    // === GIỮ NGUYÊN ===
    const fetchProducts = useCallback(async () => {
        store.setLoading(true);
        store.setError(null);
        try {
            const response = await productService.fetchProducts({
                page: store.page,
                pageSize: store.pageSize,
                filters: store.filters,
            });
            if (response.success && response.data) {
                store.setProducts(response.data);
                if (response.pagination) {
                    store.setPagination(
                        response.pagination.page,
                        response.pagination.pageSize,
                        response.pagination.totalItems,
                        response.pagination.totalPages
                    );
                }
            } else {
                store.setError(response.message || 'Lỗi khi tải danh sách sản phẩm');
            }
        } catch (error: any) {
            store.setError(error?.message || 'Đã xảy ra lỗi không xác định');
        } finally {
            store.setLoading(false);
        }
    }, [store.page, store.pageSize, store.filters]); 
    // === GIỮ NGUYÊN ===
    const handlePageChange = (newPage: number) => {
        store.setPagination(newPage, store.pageSize, store.totalItems, store.totalPages);
    };
    // === GIỮ NGUYÊN ===
    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
        
        const success = await productService.removeProduct(id);
        if (success) {
            fetchProducts();
        } else {
            alert('Không thể xóa sản phẩm. Vui lòng thử lại!');
        }
    };
    const handleSaveProduct = async (formData: ProductFormData) => {
        store.setSaving(true);
        try {
            let imageUrl = formData.imageUrl || store.editingProduct?.imageUrl || '';
            if (formData.avatarFile) {
                const uploadedUrl = await productService.uploadImage(formData.avatarFile);
                if (!uploadedUrl) {
                    alert('Upload ảnh đại diện thất bại. Vui lòng thử lại!');
                    store.setSaving(false);
                    return;
                }
                imageUrl = uploadedUrl;
            }
            let images: string[] = formData.images || [];
            if (formData.detailImageFiles && formData.detailImageFiles.length > 0) {
                const uploadedUrls = await productService.uploadMultipleImages(formData.detailImageFiles);
                if (!uploadedUrls) {
                    alert('Upload ảnh chi tiết thất bại. Vui lòng thử lại!');
                    store.setSaving(false);
                    return;
                }
                images = [...images, ...uploadedUrls];
            }
            const productData: Partial<Product> = {
                name: formData.name,
                price: formData.price,
                originalPrice: formData.originalPrice,
                discountPercentage: formData.discountPercentage,
                imageUrl,
                images,
                stockStatus: formData.stockStatus,
                description: formData.description,       
                materials: formData.materials,            
            };

            const isEditing = !!store.editingProduct;
            const success = await productService.saveProduct(
                productData,
                isEditing ? store.editingProduct!.id : undefined
            );
            if (success) {
                store.closeModal();
                fetchProducts();
            } else {
                alert('Không thể lưu sản phẩm. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
            alert('Đã xảy ra lỗi không xác định.');
        } finally {
            store.setSaving(false);
        }
    };
    return {
        ...store,
        fetchProducts,
        handlePageChange,
        handleDeleteProduct,
        handleSaveProduct,
    };
};