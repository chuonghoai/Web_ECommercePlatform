import { useState, useEffect } from "react";
import type { ApiResponse } from "../../core/api/apiResponse";
import type { ProductItem } from "../../features/products/models/product.model";
import { productService } from "../../features/products/services/product.service";
import { EFilterState, type FilterState } from "./components/filter/filter.type";

export const useMarketplaceController = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<ApiResponse<any>["pagination"]>();

    const [filters, setFilters] = useState<FilterState>({
        sortBy: EFilterState.NEWEST,
        categories: [],
        minPrice: '',
        maxPrice: ''
    });

    useEffect(() => {
        fetchProducts(1, filters);
    }, []);

    // Call API get all products
    const fetchProducts = async (page: number = 1, currentFilters: FilterState = filters) => {
        setIsLoading(true);
        try {
            const response = await productService.getAllProducts(page, 30, currentFilters);
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

    // Call API get products with filters
    const applyFilters = (newFilters: FilterState) => {
        setFilters(newFilters);
        fetchProducts(1, newFilters);
    };

    return {
        products,
        isLoading,
        pagination,
        filters,
        applyFilters,
    };
};