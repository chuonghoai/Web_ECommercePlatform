import type { ProductItem } from "../../products/models/product.model";

export type CheckoutProduct = Pick<
    ProductItem,
    "id" | "name" | "imageUrl" | "price" | "originalPrice" | "discountPercentage"
>;

export interface CheckoutItem {
    product: CheckoutProduct;
    quantity: number;
}

export interface CheckoutModel {
    items: CheckoutItem[];
    shippingFee: number;
}

export const calculateSubTotal = (items: CheckoutItem[]): number => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const calculateFinalTotal = (checkoutData: CheckoutModel): number => {
    const subTotal = calculateSubTotal(checkoutData.items);
    return subTotal + checkoutData.shippingFee;
};