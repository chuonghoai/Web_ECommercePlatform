import { useState, useEffect } from "react";
import type { ApiResponse } from "../../core/api/apiResponse";
import type { ProductItem } from "../../features/products/models/product.model";
import { productService } from "../../features/products/services/product.service";
import { categoryService } from "../../features/category/services/category.service";
import type { Category } from "../../features/category/models/category.model";

export interface FilterState {
    sortBy: string;
    categories: number[];
    minPrice: string;
    maxPrice: string;
}

export const useMarketplaceController = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<ApiResponse<any>["pagination"]>();

    const [filters, setFilters] = useState<FilterState>({
        sortBy: 'newest',
        categories: [],
        minPrice: '',
        maxPrice: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Call API get all products
    const fetchProducts = async (page: number = 1) => {
        setIsLoading(true);
        try {
            const response = await productService.getAllProducts(page, 30);
            if (response.success) {
                setProducts(response.data);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Call API get all categories
    const fetchCategories = async () => {
        try {
            const res = await categoryService.getAllCategories();
            if (res.success) {
                setCategories(res.data);
            }
        } catch (error) {
            console.error("Lỗi lấy danh mục:", error);
        }
    };

    // Button apply filter to get products
    const applyFilters = (newFilters: FilterState) => {
        setFilters(newFilters);
        fetchProducts(1);
        console.log("Đã áp dụng filter:", newFilters);
    };

    return {
        products,
        categories,
        isLoading,
        pagination,
        filters,
        applyFilters,
        fetchProducts,
    };
};