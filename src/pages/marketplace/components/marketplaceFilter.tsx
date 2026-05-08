import { useState } from "react";
import type { Category } from "../../../features/category/models/category.model";
import type { FilterState } from "../marketplace.controller";

interface MarketplaceFilterProps {
    categories: Category[];
    initialFilters: FilterState;
    onApply: (filters: FilterState) => void;
}

export const MarketplaceFilter = ({ categories, initialFilters, onApply }: MarketplaceFilterProps) => {
    const [localFilters, setLocalFilters] = useState<FilterState>(initialFilters);

    const handleSortChange = (value: string) => {
        setLocalFilters(prev => ({ ...prev, sortBy: value }));
    };

    const handleCategoryToggle = (categoryId: number) => {
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

    return (
        <div className="bg-white border border-[#E7E5E4] rounded-[8px] p-6 font-['Open_Sans',sans-serif]">
            <h2 className="font-['Lora',serif] text-[20px] font-semibold text-[#1C1917] mb-6">
                Bộ lọc sản phẩm
            </h2>

            <div className="mb-8">
                <h3 className="text-[13px] font-bold text-[#1C1917] uppercase tracking-[0.09em] mb-4">Sắp xếp theo</h3>
                <div className="flex flex-col gap-3">
                    {[
                        { id: 'newest', label: 'Mới nhất' },
                        { id: 'price_asc', label: 'Giá tăng dần' },
                        { id: 'price_desc', label: 'Giá giảm dần' },
                        { id: 'popular', label: 'Phổ biến nhất' }
                    ].map(option => (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="sort"
                                checked={localFilters.sortBy === option.id}
                                onChange={() => handleSortChange(option.id)}
                                className="w-[18px] h-[18px] accent-market-primary cursor-pointer"
                            />
                            <span className="text-[14px] text-[#57534E] group-hover:text-[#1C1917] transition-colors">
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="w-full h-px bg-[#E7E5E4] mb-8"></div>

            <div className="mb-8">
                <h3 className="text-[13px] font-bold text-[#1C1917] uppercase tracking-[0.09em] mb-4">Danh mục</h3>
                <div className="flex flex-col gap-3">
                    {categories.map(cat => (
                        <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={localFilters.categories.includes(cat.id)}
                                    onChange={() => handleCategoryToggle(cat.id)}
                                    className="w-[18px] h-[18px] accent-market-primary rounded-[3px] border-[1.5px] border-[#D6D3D1] cursor-pointer"
                                />
                                <span className="text-[14px] text-[#57534E] group-hover:text-[#1C1917] transition-colors">
                                    {cat.name}
                                </span>
                            </div>
                            <span className="text-[12px] text-[#A8A29E] bg-[#F5F5F4] px-2 py-0.5 rounded-[4px]">
                                {cat.count}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="w-full h-px bg-[#E7E5E4] mb-8"></div>

            <div className="mb-8">
                <h3 className="text-[13px] font-bold text-[#1C1917] uppercase tracking-[0.09em] mb-4">Khoảng giá (VNĐ)</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Tối thiểu"
                        value={localFilters.minPrice}
                        onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                        className="w-full bg-white border-[1.5px] border-[#D6D3D1] rounded-[4px] h-[42px] px-3 text-[14px] outline-none focus:border-market-primary focus:ring-[3px] focus:ring-market-primary/15 transition-all"
                    />
                    <span className="text-[#A8A29E]">-</span>
                    <input
                        type="text"
                        placeholder="Tối đa"
                        value={localFilters.maxPrice}
                        onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                        className="w-full bg-white border-[1.5px] border-[#D6D3D1] rounded-[4px] h-[42px] px-3 text-[14px] outline-none focus:border-market-primary focus:ring-[3px] focus:ring-market-primary/15 transition-all"
                    />
                </div>
            </div>

            <button
                onClick={() => onApply(localFilters)}
                className="w-full bg-market-primary text-white h-[42px] rounded-[4px] font-semibold text-[15px] hover:bg-[#9A3412] transition-colors"
            >
                Áp dụng bộ lọc
            </button>

            <button
                onClick={() => {
                    const resetFilters = { sortBy: 'newest', categories: [], minPrice: '', maxPrice: '' };
                    setLocalFilters(resetFilters);
                    onApply(resetFilters);
                }}
                className="w-full mt-3 bg-transparent text-[#57534E] h-[42px] rounded-[4px] font-semibold text-[14px] hover:bg-[#F5F5F4] transition-colors"
            >
                Xóa tất cả
            </button>
        </div>
    );
};