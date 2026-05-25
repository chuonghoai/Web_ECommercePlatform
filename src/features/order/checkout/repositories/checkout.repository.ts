import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { PrepareCheckoutRequest } from "../dto/checkoutRequest.dto";
import type { PrepareCheckoutModel } from "../models/checkout.model";

export interface CheckoutRepository {
    prepareOrder(request: PrepareCheckoutRequest[]): Promise<ApiResponse<PrepareCheckoutModel>>;
}