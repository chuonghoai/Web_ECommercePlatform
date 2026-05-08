import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ApiResponse } from "../../core/api/apiResponse";
import type { ProductItem } from "../../features/products/models/product.model";
import { productService } from "../../features/products/services/product.service";
import { EFilterState, type FilterState } from "./components/filter/filter.type";

export const useMarketplaceController = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<ApiResponse<any>["pagination"]>();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentUrlState = useMemo(() => {
        return {
            page: Number(searchParams.get("page")) || 1,
            filters: {
                sortBy: (searchParams.get("sortBy") as EFilterState) || EFilterState.NEWEST,
                categories: searchParams.getAll("categories"),
                minPrice: searchParams.get("minPrice") || "",
                maxPrice: searchParams.get("maxPrice") || "",
            } as FilterState,
        };
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await productService.getAllProducts(
                    currentUrlState.page,
                    30,
                    currentUrlState.filters
                );
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

        fetchProducts();
    }, [currentUrlState]);

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
        handlePageChange,
        currentPage: currentUrlState.page,
    };
};