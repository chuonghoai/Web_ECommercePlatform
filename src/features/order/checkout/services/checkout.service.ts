import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { CheckoutRequestDto, CheckoutResponseDto } from "../dto/checkoutRequest.dto";
import type { PrepareCheckoutRequest } from "../dto/prepareCheckout.dto";
import type { PrepareCheckoutModel } from "../models/checkout.model";
import type { CheckoutRepository } from "../repositories/checkout.repository";
import { CheckoutApiRepository } from "../repositories/checkoutApi.repository";
import { CheckoutMockRepository } from "../repositories/checkoutMock.repository";

export class CheckoutService {
    private readonly checkoutRepository: CheckoutRepository;

    constructor(checkoutRepository?: CheckoutRepository) {
        this.checkoutRepository = checkoutRepository || new CheckoutApiRepository();
    }

    async prepareOrder(request: PrepareCheckoutRequest[]): Promise<ApiResponse<PrepareCheckoutModel>> {
        return this.checkoutRepository.prepareOrder(request);
    }

    async checkoutOrder(request: CheckoutRequestDto): Promise<ApiResponse<CheckoutResponseDto>> {
        return this.checkoutRepository.checkoutOrder(request);
    }
}

const useMock = false;
export const checkoutService = new CheckoutService(
    useMock ? new CheckoutMockRepository() : undefined
);