import { useState, useEffect, useMemo } from "react";
import { categoryService } from "../../../../features/category/services/category.service";
import type { Category } from "../../../../features/category/models/category.model";
import { EFilterState, type FilterState } from "./filter.type";
import { useSearchParams } from "react-router-dom";

export const useFilterController = (onApply: (filters: FilterState) => void) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentFiltersFromUrl = useMemo((): FilterState => {
        return {
            sortBy: (searchParams.get("sortBy") as EFilterState) || EFilterState.NEWEST,
            categories: searchParams.getAll("categories"),
            minPrice: searchParams.get("minPrice") || "",
            maxPrice: searchParams.get("maxPrice") || "",
        };
    }, [searchParams]);

    const [localFilters, setLocalFilters] = useState<FilterState>(currentFiltersFromUrl);

    useEffect(() => {
        setLocalFilters(currentFiltersFromUrl);
    }, [currentFiltersFromUrl]);

    useEffect(() => {
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

        fetchCategories();
    }, []);

    const handleSortChange = (value: EFilterState) => {
        setLocalFilters((prev) => ({ ...prev, sortBy: value }));
    };

    const handleCategoryToggle = (categoryId: string) => {
        setLocalFilters((prev) => {
            const isSelected = prev.categories.includes(categoryId);
            const newCategories = isSelected
                ? prev.categories.filter((id) => id !== categoryId)
                : [...prev.categories, categoryId];
            return { ...prev, categories: newCategories };
        });
    };

    const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
        if (value === '' || /^\d+$/.test(value)) {
            setLocalFilters(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleApply = () => {
        const params = new URLSearchParams();

        params.set("page", "1");
        params.set("sortBy", localFilters.sortBy);
        if (localFilters.minPrice) params.set("minPrice", localFilters.minPrice);
        if (localFilters.maxPrice) params.set("maxPrice", localFilters.maxPrice);

        localFilters.categories.forEach((id) => params.append("categories", id));

        setSearchParams(params);
        onApply(localFilters);
    };

    const handleReset = () => {
        setSearchParams({ page: "1", sortBy: EFilterState.NEWEST });
    };

    return {
        categories,
        localFilters,
        handleSortChange,
        handleCategoryToggle,
        handlePriceChange,
        handleApply,
        handleReset
    };
};