import type { ProductItem } from "../../../products/models/product.model";

/**
 * Các sản phẩm được chọn để chuẩn bị tạo đơn hàng
 */
type CheckoutItem = {
    product: {
        id: ProductItem["id"];
        name: ProductItem["name"];
        imageUrl: ProductItem["imageUrl"];
        price: ProductItem["price"];
        originalPrice: ProductItem["originalPrice"];
        discountPercentage: ProductItem["discountPercentage"];
    };
    quantity: number;
    amount: number;     // = quantity * amount
}

/**
 * Địa chỉ mặc định của người dùng
 * Nếu user chưa có địa chỉ, trả về null
 */
type Address = {
    id: number;

    fullName: string;
    phoneNumber: string;

    provinceCode: string;
    provinceName: string;   // Ví dụ: TPHCM

    districtCode: string;
    districtName: string;   // Ví dụ: Quận 1

    wardCode: string;
    wardName: string;       // Ví dụ: Phường Bến Thành

    street: string;         // Ví dụ: Số 227 Nguyễn Văn Cừ

    latitude: number;   // Vĩ độ, kinh độ dùng để tính khoảng cách đến shop -> tính shipping fee
    longitude: number;

    fullAddress: string;    // Chuỗi hoàn chính: Số 227 Nguyễn Văn Cừ, Phường Bến Thành, Quận 1, TPHCM
}

/**
 * Sản phẩm không khả dụng
 * Ví dụ: Sản phẩm hết hàng, sản phẩm không tồn tại...
 * Có thể trả về null nếu toàn bộ đều hợp lệ
 */
type InvalidItem = {
    productId: string;
    reason: string;
};

export interface PrepareCheckoutModel {
    address: Address;   // Địa chỉ giao hàng

    items: CheckoutItem[];  // Danh sách product muốn mua

    subTotal: number;   // Tổng tiền sản phẩm
    shippingFee: number;    // Phí vận chuyển: Backend dựa vào tọa độ của address, dùng google map để tính giá tiền
    totalAmount: number;    // = subTotal + shippingFee

    invalidItems: InvalidItem[];    // Các sản phẩm không khả dụng
}