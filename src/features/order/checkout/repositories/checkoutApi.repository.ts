import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { PrepareCheckoutRequest } from "../../dto/checkout.dto";
import type { PrepareCheckoutModel } from "../../models/checkout.model";
import type { CheckoutRepository } from "./checkout.repository";

export class CheckoutApiRepository implements CheckoutRepository {
    /**
     * POST /orders/prepare
     * @body request: PrepareCheckoutRequest[]
     * @returns PrepareCheckoutModel
     */
    prepareOrder(request: PrepareCheckoutRequest[]): Promise<ApiResponse<PrepareCheckoutModel>> {
        return apiClient.post<ApiResponse<PrepareCheckoutModel>>("/orders/prepare", request);
    }
}