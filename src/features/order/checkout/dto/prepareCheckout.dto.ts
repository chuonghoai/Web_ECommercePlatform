export interface PrepareCheckoutRequest {
    productId: string;
    quantity: number;
}

export interface PrepareCheckoutPayload {
    items: PrepareCheckoutRequest[];
    addressId?: number;
}
