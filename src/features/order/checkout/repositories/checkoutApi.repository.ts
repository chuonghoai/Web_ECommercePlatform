import { apiClient } from "../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { CheckoutRequestDto, CheckoutResponseDto } from "../dto/checkoutRequest.dto";
import type { PrepareCheckoutRequest } from "../dto/prepareCheckout.dto";
import type { PrepareCheckoutModel } from "../models/checkout.model";
import type { CheckoutRepository } from "./checkout.repository";

export class CheckoutApiRepository implements CheckoutRepository {
    /**
     * POST /orders/prepare
     * @body request: PrepareCheckoutRequest[]
     * @returns PrepareCheckoutModel
     */
    async prepareOrder(request: PrepareCheckoutRequest[]): Promise<ApiResponse<PrepareCheckoutModel>> {
        return apiClient.post<ApiResponse<PrepareCheckoutModel>>("/orders/prepare", request);
    }

    /**
     * POST /orders/checkout
     * @body CheckoutRequestDto
     * @returns CheckoutResponseDto
     * 
     * Mô tả:
     *  - Nếu CheckoutRequestDto.paymentMethod là COD 
     *      => paymentRequired = false, orderId = id đơn hàng vừa tạo, payUrl = null
     *  - Nếu CheckoutRequestDto.paymentMethod là MOMO 
     *      => paymentRequired = true, orderId = id đơn hàng vừa tạo, payUrl = url để redirect user thanh toán
     */
    async checkoutOrder(request: CheckoutRequestDto): Promise<ApiResponse<CheckoutResponseDto>> {
        return apiClient.post<ApiResponse<CheckoutResponseDto>>("/orders/checkout", request);
    }
}