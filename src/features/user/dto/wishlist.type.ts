export type WishlistItem = {
    id: string;
    name: string;
    price: number;
    discountPrice: number;
    thumbnail: string;
    isFavorite: true;
};

export type WishlistResponse = {
    items: WishlistItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};
