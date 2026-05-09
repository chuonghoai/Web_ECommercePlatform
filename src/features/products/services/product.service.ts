import type { ApiResponse } from "../../../core/api/apiResponse";
import { EFilterState, type FilterState } from "../../../pages/marketplace/components/filter/filter.type";
import type { ProductItem } from "../models/product.model";
import type { ProductDetail } from "../models/productDetail.model";

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
            categoryId: "1",
            createdAt: "2026-05-08T10:00:00Z",
            soldCount: 125
        },
        {
            id: "2",
            name: "Ví nam da bò sáp khâu tay",
            imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
            price: 320000,
            originalPrice: 400000,
            discountPercentage: 20,
            rating: 4.9,
            categoryId: "2",
            createdAt: "2026-05-05T08:30:00Z",
            soldCount: 340
        },
        {
            id: "3",
            name: "Cốc cafe gốm hoạ tiết hoa sen",
            imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
            price: 150000,
            originalPrice: 150000,
            discountPercentage: 0,
            rating: 4.7,
            categoryId: "1",
            createdAt: "2026-05-01T15:20:00Z",
            soldCount: 89
        },
        {
            id: "4",
            name: "Vòng tay trầm hương tự nhiên",
            imageUrl: "https://chiasetainguyen.com/upload-file/vong-tay-tram-huong-1650d0e1d07052.jpg",
            price: 850000,
            originalPrice: 1000000,
            discountPercentage: 0,
            rating: 5.0,
            categoryId: "4",
            createdAt: "2026-05-07T09:15:00Z",
            soldCount: 412
        },
        {
            id: "5",
            name: "Khăn choàng dệt tay hoạ tiết thổ cẩm",
            imageUrl: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop",
            price: 250000,
            originalPrice: 250000,
            discountPercentage: 5,
            rating: 4.6,
            categoryId: "3",
            createdAt: "2026-04-20T11:00:00Z",
            soldCount: 56
        },
        {
            id: "6",
            name: "Lọ hoa gỗ lũa nghệ thuật",
            imageUrl: "https://th.bing.com/th/id/OIP.prMCooHgX8QImiqNbgeeOwHaHZ?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
            price: 1200000,
            originalPrice: 1200000,
            discountPercentage: 0,
            rating: 4.9,
            categoryId: "5",
            createdAt: "2026-05-02T14:45:00Z",
            soldCount: 12
        }
    ];

    /**
     * Get list of products with pagination
     * @param page Current page (default = 1)
     * @param pageSize Total item per page (default = 30)
     * @param filters - Object contains filter criteria
     * Response: ProductItem[] with pagination
     */
    async getAllProducts(
        page: number = 1,
        pageSize: number = 30,
        filters?: FilterState
    ): Promise<ApiResponse<ProductItem[]>> {
        let filteredItems = [...this.mockProducts];

        if (filters) {
            // 1. Lọc theo danh mục (Checkbox)
            if (filters.categories && filters.categories.length > 0) {
                filteredItems = filteredItems.filter(p => p.categoryId && filters.categories.includes(p.categoryId));
            }

            // 2. Lọc theo khoảng giá
            if (filters.minPrice) {
                const min = parseInt(filters.minPrice, 10);
                if (!isNaN(min)) {
                    filteredItems = filteredItems.filter(p => p.price >= min);
                }
            }
            if (filters.maxPrice) {
                const max = parseInt(filters.maxPrice, 10);
                if (!isNaN(max)) {
                    filteredItems = filteredItems.filter(p => p.price <= max);
                }
            }

            // 3. Sắp xếp (Sort)
            switch (filters.sortBy) {
                case EFilterState.PRICE_LOW_TO_HIGH:
                    filteredItems.sort((a, b) => a.price - b.price);
                    break;
                case EFilterState.PRICE_HIGH_TO_LOW:
                    filteredItems.sort((a, b) => b.price - a.price);
                    break;
                case EFilterState.POPULARITY:
                    filteredItems.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
                    break;
                case EFilterState.NEWEST:
                default:
                    // Sắp xếp ngày mới nhất lên đầu
                    filteredItems.sort((a, b) => {
                        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                        return dateB - dateA;
                    });
                    break;
            }
        }

        const fakeTotalPages = 50;
        const fakeTotalItems = 1500;
        const currentPage = Math.max(1, Math.min(page, fakeTotalPages));
        const paginatedItems = filteredItems;

        return {
            success: true,
            message: "Lấy danh sách sản phẩm thành công",
            data: paginatedItems,
            pagination: {
                page: currentPage,
                pageSize: pageSize,
                totalItems: fakeTotalItems,
                totalPages: fakeTotalPages
            }
        };
    }

    /**
     * Get product by id
     * @param id 
     * Response: ProductDetail
     */
    async getProductById(id: string): Promise<ApiResponse<ProductDetail | null>> {
        const product = {
            id: id,
            name: "Bình gốm mộc nung củi men tro",
            imageUrl: "https://www.tita.art/wp-content/uploads/2021/12/30.png",
            price: 450000,
            originalPrice: 500000,
            discountPercentage: 10,
            rating: 4.8,
            categoryId: "1",
            categoryName: "Gốm sứ & Điêu khắc",
            createdAt: "2026-05-08T10:00:00Z",
            soldCount: 125,
            images: [
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://www.tita.art/wp-content/uploads/2021/12/30.png",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://www.tita.art/wp-content/uploads/2021/12/30.png",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
            ],
            description: "Bình gốm mộc nung củi men tro",
            stock: 10,
            materials: ["Đất sét", "Men tro", "Gỗ sồi"],
            dimensions: "Cao 15cm, Đường kính 10cm",
            weight: "500g",
            careInstructions: "Chỉ rửa bằng tay, không dùng máy rửa bát",
            isFavorite: false,
            sellerInfo: {
                id: "1",
                name: "Tần Thủy Hoàng",
                avatarUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
                totalProducts: 10,
                averageRating: 4.8,
            }
        }

        return {
            success: true,
            message: "Lấy sản phẩm thành công",
            data: product
        };
    }
}

export const productService = new ProductService();