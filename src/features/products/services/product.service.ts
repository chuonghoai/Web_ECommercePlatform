import type { ApiResponse } from "../../../core/api/apiResponse";
import type { ProductItem } from "../models/product.model";

export class ProductService {

    private mockProducts: ProductItem[] = [
        {
            id: "1",
            name: "Bình gốm mộc nung củi men tro",
            imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
            price: 450000,
            originalPrice: 500000,
            discountPercentage: 10,
            rating: 4.8,
        },
        {
            id: "2",
            name: "Ví nam da bò sáp khâu tay",
            imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
            price: 320000,
            originalPrice: 400000,
            discountPercentage: 20,
            rating: 4.9,
        },
        {
            id: "3",
            name: "Cốc cafe gốm hoạ tiết hoa sen",
            imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
            price: 150000,
            originalPrice: 150000,
            discountPercentage: 0,
            rating: 4.7,
        },
        {
            id: "4",
            name: "Vòng tay trầm hương tự nhiên",
            imageUrl: "https://images.unsplash.com/photo-1611080922858-6a3f9a74fb1c?q=80&w=800&auto=format&fit=crop",
            price: 850000,
            originalPrice: 1000000,
            discountPercentage: 0,
            rating: 5.0,
        },
        {
            id: "5",
            name: "Khăn choàng dệt tay hoạ tiết thổ cẩm",
            imageUrl: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop",
            price: 250000,
            originalPrice: 250000,
            discountPercentage: 5,
            rating: 4.6,
        },
        {
            id: "6",
            name: "Lọ hoa gỗ lũa nghệ thuật",
            imageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850d0a1?q=80&w=800&auto=format&fit=crop",
            price: 1200000,
            originalPrice: 1200000,
            discountPercentage: 0,
            rating: 4.9,
        }
    ];

    /**
     * Get list of products with pagination
     * @param page Current page (default = 1)
     * @param pageSize Total item per page (default = 30)
     */
    async getAllProducts(page: number = 1, pageSize: number = 30): Promise<ApiResponse<ProductItem[]>> {
        await new Promise(resolve => setTimeout(resolve, 800));
        const totalItems = this.mockProducts.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const currentPage = Math.max(1, Math.min(page, totalPages || 1));
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = this.mockProducts.slice(startIndex, endIndex);

        return {
            success: true,
            message: "Lấy danh sách sản phẩm thành công",
            data: paginatedItems,
            pagination: {
                page: currentPage,
                pageSize: pageSize,
                totalItems: totalItems,
                totalPages: totalPages
            }
        };
    }
}

export const productService = new ProductService();