import { useState, useEffect } from "react";
import { categoryService } from "../../../../features/category/services/category.service";
import type { Category } from "../../../../features/category/models/category.model";
import { EFilterState, type FilterState } from "./filter.type";


export const useFilterController = (
    initialFilters: FilterState,
    onApply: (filters: FilterState) => void
) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [localFilters, setLocalFilters] = useState<FilterState>(initialFilters);

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
        setLocalFilters(prev => ({ ...prev, sortBy: value }));
    };

    const handleCategoryToggle = (categoryId: string) => {
        setLocalFilters(prev => {
            const isSelected = prev.categories.includes(categoryId);
            if (isSelected) {
                return { ...prev, categories: prev.categories.filter(id => id !== categoryId) };
            } else {
                return { ...prev, categories: [...prev.categories, categoryId] };
            }
        });
    };

    const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
        if (value === '' || /^\d+$/.test(value)) {
            setLocalFilters(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleApply = () => {
        onApply(localFilters);
    };

    const handleReset = () => {
        const resetFilters: FilterState = { sortBy: EFilterState.NEWEST, categories: [], minPrice: '', maxPrice: '' };
        setLocalFilters(resetFilters);
        onApply(resetFilters);
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