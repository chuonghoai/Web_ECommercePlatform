import type { ApiResponse } from "../../../core/api/apiResponse";
import type { Category } from "../models/category.model";
import type { CategoryRepository } from "../repository/category.repository";
import { CategoryApiRepository } from "../repository/categoryApi.repository";

export class CategoryService {
    private readonly categoryRepository: CategoryRepository;

    constructor(categoryRepository?: CategoryRepository) {
        this.categoryRepository = categoryRepository || new CategoryApiRepository();
    }

    async getAllCategories(): Promise<ApiResponse<Category[]>> {
        return this.categoryRepository.getAllCategories();
    }
}

export const categoryService = new CategoryService();