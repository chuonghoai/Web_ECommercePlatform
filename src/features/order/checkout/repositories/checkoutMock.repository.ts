import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { PrepareCheckoutRequest } from "../dto/checkoutRequest.dto";
import type { PrepareCheckoutModel } from "../models/checkout.model";
import type { CheckoutRepository } from "./checkout.repository";

export class CheckoutMockRepository implements CheckoutRepository {
    prepareOrder(request: PrepareCheckoutRequest[]): Promise<ApiResponse<PrepareCheckoutModel>> {
        const response: ApiResponse<PrepareCheckoutModel> = {
            success: true,
            message: "Success",
            data: {
                address: {
                    id: 1,
                    fullName: "John Doe",
                    phoneNumber: "1234567890",
                    provinceCode: 123,
                    provinceName: "Province 1",
                    districtCode: 123,
                    districtName: "District 1",
                    wardCode: 123,
                    wardName: "Ward 1",
                    street: "Street 1",
                    latitude: 10.88206144628933,
                    longitude: 106.76458444116837,
                    fullAddress: "Address 1",
                },

                items: [
                    {
                        product: {
                            id: "1",
                            name: "Product 1",
                            imageUrl: "https://example.com/product1.jpg",
                            price: 100000,
                            originalPrice: 120000,
                            discountPercentage: 0,

                        },
                        quantity: 2,
                        amount: 100000 * 2
                    },
                    {
                        product: {
                            id: "2",
                            name: "Product 1",
                            imageUrl: "https://example.com/product2.jpg",
                            price: 90000,
                            originalPrice: 100000,
                            discountPercentage: 0,

                        },
                        quantity: 1,
                        amount: 90000 * 1
                    },
                ],

                subTotal: 290000,
                shippingFee: 30000,
                totalAmount: 290000 + 30000,

                invalidItems: [
                    {
                        productId: "1",
                        reason: "Hết hàng"
                    }
                ],
            },
        };

        return Promise.resolve(response);
    }
}