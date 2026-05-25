import type { PaymentMethod } from "../enums/paymentMethod.enum";

/**
 * Mua sản phẩm productId với số lượng quantity
 * Backend tự check giá trong database
 */
export interface CheckoutItemRequest {
    productId: string;
    quantity: number;
}

/**
 * - items: Danh sách các sản phẩm muốn mua
 * - addressId: Id địa chỉ giao hàng (đã lưu trong database)
 * - voucherIds: Danh sách id voucher đã chọn, Fe có thể gửi hoặc ko gửi voucher
 * - paymentMethod: Phương thức thanh toán, hiện tại chỉ có COD hoặc MOMO
 */
export interface CheckoutRequestDto {
    items: CheckoutItemRequest[];

    addressId: number;

    voucherIds?: string[];

    paymentMethod: PaymentMethod;
}
