import { create } from 'zustand';
import type { Product, ProductFilters } from '../../features/products/models/product.model';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;

    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    filters: ProductFilters;

    saving: boolean;

    setProducts: (products: Product[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (page: number, pageSize: number, totalItems: number, totalPages: number) => void;
    setFilters: (filters: ProductFilters) => void;
    setSaving: (saving: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    loading: false,
    error: null,

    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    filters: {},

    saving: false,

    setProducts: (products) => set({ products }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (page, pageSize, totalItems, totalPages) =>
        set({ page, pageSize, totalItems, totalPages }),
    setFilters: (filters) => set({ filters, page: 1 }),
    setSaving: (saving) => set({ saving }),
}));