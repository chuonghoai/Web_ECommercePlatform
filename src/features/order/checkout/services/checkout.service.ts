import type { PrepareCheckoutRequest } from "../dto/checkout.dto";
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

export const checkoutService = new CheckoutService(new CheckoutMockRepository());