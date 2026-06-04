import type { ApiResponse } from '../../../../core/api/apiResponse';
import type { Product, GetProductsQuery, CreateProductRequest, UpdateProductRequest } from '../models/product.model';
import type { IProductRepository } from '../repositories/product.repository';
import type { IUploadRepository } from '../repositories/upload.repository';
import { ProductApiRepository } from '../repositories/productApi.repository';
import { ProductMockRepository } from '../repositories/productMock.repository';
import { UploadApiRepository } from '../repositories/uploadApi.repository';
import { UploadMockRepository } from '../repositories/uploadMock.repository';
import { USE_MOCK } from '../../../../core/config/useMock.config';

export class ProductService {
    private readonly productRepository: IProductRepository;
    private readonly uploadRepository: IUploadRepository;

    constructor(productRepository: IProductRepository, uploadRepository: IUploadRepository) {
        this.productRepository = productRepository;
        this.uploadRepository = uploadRepository;
    }

    // === Fetch ===

    async fetchProducts(query: GetProductsQuery): Promise<ApiResponse<Product[]>> {
        try {
            const formatQuery: any = {
                page: query.page || 1,
                pageSize: query.pageSize || 10,
            };
            if (query.filters?.sortBy) {
                formatQuery['filters[sortBy]'] = query.filters.sortBy;
            }
            return await this.productRepository.getProducts(formatQuery);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            throw error;
        }
    }

    async fetchProductById(id: string): Promise<ApiResponse<Product>> {
        try {
            return await this.productRepository.getProductById(id);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            throw error;
        }
    }

    // === CRUD ===

    async removeProduct(id: string): Promise<boolean> {
        try {
            await this.productRepository.deleteProduct(id);
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            return false;
        }
    }

    async saveProduct(data: CreateProductRequest, id?: string): Promise<boolean> {
        try {
            if (id) {
                await this.productRepository.updateProduct(id, data);
            } else {
                await this.productRepository.createProduct(data);
            }
            return true;
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
            return false;
        }
    }

    // === Upload ===

    /**
     * Upload nhiều file ảnh qua API /media/uploads.
     * @returns Mảng URL ảnh đã upload, hoặc null nếu lỗi.
     */
    async uploadImages(files: File[], folder: string = 'products'): Promise<string[] | null> {
        try {
            const response = await this.uploadRepository.uploadFiles(files, folder);
            if (response.success && response.data) {
                return response.data.map(item => item.url);
            }
            console.error('Upload thất bại:', response.message);
            return null;
        } catch (error) {
            console.error('Lỗi khi upload ảnh:', error);
            return null;
        }
    }
}

// === Khởi tạo instance — chọn Mock hoặc Api dựa trên USE_MOCK ===
export const productService = new ProductService(
    USE_MOCK ? new ProductMockRepository() : new ProductApiRepository(),
    USE_MOCK ? new UploadMockRepository() : new UploadApiRepository()
);