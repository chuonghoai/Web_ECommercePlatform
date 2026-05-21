import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { PrepareCheckoutRequest } from "../dto/checkout.dto";
import type { PrepareCheckoutModel } from "../models/checkout.model";

export interface CheckoutRepository {
    prepareOrder(request: PrepareCheckoutRequest[]): Promise<ApiResponse<PrepareCheckoutModel>>;
}