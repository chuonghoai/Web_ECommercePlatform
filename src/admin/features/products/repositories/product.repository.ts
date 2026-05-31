import { apiClient } from "../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { GetProductsQuery, Product } from "../models/product.model";

export interface ProductRepository {
    getProducts(query: GetProductsQuery): Promise<ApiResponse<Product[]>>;
    deleteProduct(id: string): Promise<ApiResponse<null>>;
    createProduct(data: Partial<Product>): Promise<ApiResponse<Product>>;
    updateProduct(id: string, data: Partial<Product>): Promise<ApiResponse<Product>>;
}

export const productRepository: ProductRepository = {
    async getProducts (query: GetProductsQuery) {
        return apiClient.get<ApiResponse<Product[]>>('/products', { params: query });
    },

     async deleteProduct(id: string) {
        return apiClient.delete<ApiResponse<null>>(`/products/${id}`);
    },

    async createProduct(data: Partial<Product>) {
        return apiClient.post<ApiResponse<Product>>('/products', data);
    },
    
    async updateProduct(id: string, data: Partial<Product>) {
        return apiClient.put<ApiResponse<Product>>(`/products/${id}`, data);
    }

}