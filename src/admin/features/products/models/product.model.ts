export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    originalPrice: number | null;
    discountPercentage: number;
    rating: number;
    images: string[];
    description?: string;
    materials: string[];
    categoryName?: string;
    categoryId?: string;
    sellerInfo?: {
        id: string;
        name: string;
        avatarUrl: string;
        totalProducts: number;
        averageRating: number;
    };
    stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export const EFilterState = {
    NEWEST: 'newest',
    PRICE_LOW_TO_HIGH: 'price_asc',
    PRICE_HIGH_TO_LOW: 'price_desc',
    RATING_HIGH_TO_LOW: 'rating',
    POPULARITY: 'popular',
} as const;

export type EFilterState = typeof EFilterState[keyof typeof EFilterState];

export interface ProductFilters {
    sortBy?: EFilterState;
    categories?: string[];
    minPrice?: string;
    maxPrice?: string;
}

export interface GetProductsQuery {
    page?: number;
    pageSize?: number;
    filters?: ProductFilters;
}

export interface PaginatedResponse<T> {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    data: T[];
}

export interface UploadFileResponse {
    url: string;
    publicId: string;
    format: string;
    bytes: number;
}

export interface CreateProductRequest {
    name: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    imageUrl: string;
    images: string[];
    description?: string;
    materials?: string[];
    stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export type UpdateProductRequest = Partial<CreateProductRequest>;

export interface ProductFormData {
    name: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
    description: string;
    materials: string[];
    avatarFile?: File | null;
    detailImageFiles?: File[];
    imageUrl?: string;
    images?: string[];
}