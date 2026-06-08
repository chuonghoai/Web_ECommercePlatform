import { useCallback } from 'react';
import { useProductStore } from './products.store';
import { productService } from '../../features/products/services/product.service';
import type { Product, ProductFormData, CreateProductRequest } from '../../features/products/models/product.model';
import { mediaService } from '../../../features/media/services/media.service';

export const useProductController = () => {
    const store = useProductStore();

    // === Fetch danh sách sản phẩm ===
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

    // === Fetch chi tiết 1 sản phẩm (cho Edit/Detail page) ===
    const fetchProductById = useCallback(async (id: string): Promise<Product | null> => {
        try {
            const response = await productService.fetchProductById(id);
            if (response.success && response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            return null;
        }
    }, []);

    // === Phân trang ===
    const handlePageChange = (newPage: number) => {
        store.setPagination(newPage, store.pageSize, store.totalItems, store.totalPages);
    };

    // === Xóa sản phẩm ===
    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
        const success = await productService.removeProduct(id);
        if (success) {
            fetchProducts();
        } else {
            alert('Không thể xóa sản phẩm. Vui lòng thử lại!');
        }
    };

    // === Lưu sản phẩm (tạo mới hoặc cập nhật) ===
    const handleSaveProduct = async (
        formData: ProductFormData,
        editingProductId?: string
    ): Promise<boolean> => {
        store.setSaving(true);
        try {
            let imageUrl = formData.imageUrl || '';
            let images: string[] = formData.images || [];
            const mediaPublicIds: string[] = [];

            // 1. Upload ảnh đại diện (nếu có file mới)
            if (formData.avatarFile) {
                const results = await mediaService.uploadMultipleFiles([formData.avatarFile]);
                if (!results || results.length === 0) {
                    alert('Upload ảnh đại diện thất bại. Vui lòng thử lại!');
                    return false;
                }
                imageUrl = results[0].url;
                mediaPublicIds.push(results[0].publicId);
            }

            // 2. Upload ảnh chi tiết mới (nếu có)
            if (formData.detailImageFiles && formData.detailImageFiles.length > 0) {
                const results = await mediaService.uploadMultipleFiles(formData.detailImageFiles);
                if (!results) {
                    alert('Upload ảnh chi tiết thất bại. Vui lòng thử lại!');
                    return false;
                }
                const newUrls = results.map(r => r.url);
                const newPublicIds = results.map(r => r.publicId);
                images = [...images, ...newUrls];
                mediaPublicIds.push(...newPublicIds);
            }

            // 3. Build request payload
            const productData: CreateProductRequest = {
                name: formData.name,
                price: formData.price,
                originalPrice: formData.originalPrice,
                discountPercentage: formData.discountPercentage,
                imageUrl,
                images,
                mediaPublicIds,
                stockStatus: formData.stockStatus,
                description: formData.description,
                materials: formData.materials,
            };

            // 4. Gọi API tạo/cập nhật
            const success = await productService.saveProduct(productData, editingProductId);
            if (!success) {
                alert('Không thể lưu sản phẩm. Vui lòng thử lại!');
            }
            return success;
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
            alert('Đã xảy ra lỗi không xác định.');
            return false;
        } finally {
            store.setSaving(false);
        }
    };

    return {
        ...store,
        fetchProducts,
        fetchProductById,
        handlePageChange,
        handleDeleteProduct,
        handleSaveProduct,
    };
};