import type { EOrderStatus } from "../../enums/orderStatus.enum";
import type { EPaymentMethod } from "../../enums/paymentMethod.enum";

export interface CheckoutResultDto {
    orderId: string;
    paymentMethod: EPaymentMethod;
    orderStatus: EOrderStatus;
}