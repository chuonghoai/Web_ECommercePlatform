import type { PrepareCheckoutRequest } from "../dto/checkoutRequest.dto";
import type { CheckoutRepository } from "../repositories/checkout.repository";
import { CheckoutApiRepository } from "../repositories/checkoutApi.repository";
import { CheckoutMockRepository } from "../repositories/checkoutMock.repository";

export class CheckoutService {
    private readonly checkoutRepository: CheckoutRepository;

    constructor(checkoutRepository?: CheckoutRepository) {
        this.checkoutRepository = checkoutRepository || new CheckoutApiRepository();
    }

    async prepareOrder(request: PrepareCheckoutRequest[]) {
        return this.checkoutRepository.prepareOrder(request);
    }
}

const useMock = true;
export const checkoutService = new CheckoutService(
    useMock ? new CheckoutMockRepository() : undefined
);