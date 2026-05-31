import type { ApiResponse } from '../../../../core/api/apiResponse';
import type { GetProductsQuery, Product } from '../models/product.model';
import { productRepository } from '../repositories/product.repository';
import { uploadRepository } from '../repositories/upload.repository';
export class ProductService {
    async fetchProducts(query: GetProductsQuery): Promise<ApiResponse<Product[]>> {
        try {
            const formatQuery: any = {
                page: query.page || 1,
                pageSize: query.pageSize || 10,
            };
            if (query.filters?.sortBy) {
                formatQuery['filters[sortBy]'] = query.filters.sortBy;
            }
            return await productRepository.getProducts(formatQuery);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            throw error;
        }
    }
    async removeProduct(id: string): Promise<boolean> {
        try {
            await productRepository.deleteProduct(id);
            return true; 
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            return false;
        }
    }
    async saveProduct(data: Partial<Product>, id?: string): Promise<boolean> {
        try {
            if (id) {
                await productRepository.updateProduct(id, data);
            } else {
                await productRepository.createProduct(data);
            }
            return true;
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
            return false;
        }
    }

    async uploadImage(file: File): Promise<string | null> {
        try {
            const response = await uploadRepository.uploadImage(file);
            return response.url || response.imageUrl || null;
        } catch (error) {
            console.error('Lỗi khi upload ảnh:', error);
            return null;
        }
    }

    async uploadMultipleImages(files: File[]): Promise<string[] | null> {
        try {
            const promises = files.map(file => this.uploadImage(file));
            const results = await Promise.all(promises);
            const urls = results.filter((url): url is string => url !== null);
            if (urls.length === 0) return null;
            if (urls.length < files.length) {
                console.warn(`Upload ${files.length} ảnh, chỉ thành công ${urls.length}`);
            }
            return urls;
        } catch (error) {
            console.error('Lỗi khi upload nhiều ảnh:', error);
            return null;
        }
    }
}
export const productService = new ProductService();