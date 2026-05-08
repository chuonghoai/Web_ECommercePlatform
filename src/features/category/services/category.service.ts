import type { ApiResponse } from "../../../core/api/apiResponse";
import type { Category } from "../models/category.model";

export class CategoryService {
    private mockCategories: Category[] = [
        { id: "1", name: "Gốm sứ & Điêu khắc", count: 142 },
        { id: "2", name: "Đồ da thủ công", count: 86 },
        { id: "3", name: "Dệt may & Đan lát", count: 215 },
        { id: "4", name: "Trang sức nghệ thuật", count: 94 },
        { id: "5", name: "Đồ gỗ & Nội thất", count: 38 },
        { id: "6", name: "Nến & Nước hoa", count: 57 },
    ];

    /**
     * Get list all categories
     * Response: Category[]
     */
    async getAllCategories(): Promise<ApiResponse<Category[]>> {
        return {
            success: true,
            message: "Lấy danh sách danh mục thành công",
            data: this.mockCategories
        };
    }
}

export const categoryService = new CategoryService();