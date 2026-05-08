import { useState, useEffect, useMemo } from "react";
import type { ApiResponse } from "../../core/api/apiResponse";
import type { ProductItem } from "../../features/products/models/product.model";
import { productService } from "../../features/products/services/product.service";
import { EFilterState, type FilterState } from "./components/filter/filter.type";
import { useSearchParams } from "react-router-dom";

export const useMarketplaceController = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<ApiResponse<any>["pagination"]>();
    const [searchParams, setSearchParams] = useSearchParams();

    // State filters
    const [filters, setFilters] = useState<FilterState>({
        sortBy: EFilterState.NEWEST,
        categories: [],
        minPrice: '',
        maxPrice: ''
    });

    // Get page from URL
    const currentPage = useMemo(() => {
        return Number(searchParams.get("page")) || 1;
    }, [searchParams]);

    useEffect(() => {
        fetchProducts(currentPage, filters);
    }, [currentPage, filters]);

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
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    };

    const handlePageChange = (newPage: number) => {
        if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
            searchParams.set("page", newPage.toString());
            setSearchParams(searchParams);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return {
        products,
        isLoading,
        pagination,
        filters,
        applyFilters,
        handlePageChange,
        currentPage,
    };
};