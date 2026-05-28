import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { CheckoutRequestDto, CheckoutResponseDto } from "../dto/checkoutRequest.dto";
import type { PrepareCheckoutRequest } from "../dto/prepareCheckout.dto";
import type { PrepareCheckoutModel } from "../models/checkout.model";
import type { CheckoutResultDto } from "../models/checkoutResult.dto";

export interface CheckoutRepository {
    prepareOrder(request: PrepareCheckoutRequest[]): Promise<ApiResponse<PrepareCheckoutModel>>;

    checkoutOrder(request: CheckoutRequestDto): Promise<ApiResponse<CheckoutResponseDto>>;

    getOrderResult(orderId: string): Promise<ApiResponse<CheckoutResultDto>>;
}