import type { ApiResponse } from "../../../core/api/apiResponse";
import type { FilterState } from "../../../pages/marketplace/components/filter/filter.type";
import type { ProductItem } from "../models/product.model";
import type { ProductDetail } from "../models/productDetail.model";
import type { ProductRepository } from "../repositories/product.repository";
import { ProductApiRepository } from "../repositories/productApi.repository";
import { ProductMockRepository } from "../repositories/productMock.repository";

export class ProductService {
    private readonly productRepository: ProductRepository;

    constructor(productRepository?: ProductRepository, useMock: boolean = true) {
        if (productRepository) {
            this.productRepository = productRepository;
        } else {
            this.productRepository = useMock ? new ProductMockRepository() : new ProductApiRepository();
        }
    }

    async getAllProducts(
        page: number = 1,
        pageSize: number = 50,
        filters?: FilterState
    ): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepository.getAllProducts(page, pageSize, filters);
    }

    async getProductById(id: string): Promise<ApiResponse<ProductDetail>> {
        return this.productRepository.getProductById(id);
    }
}

// Bật useMock = true để chạy giao diện không cần Backend
export const productService = new ProductService(undefined, true);