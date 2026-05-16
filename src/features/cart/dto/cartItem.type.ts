/**
 * Thông tin sản phẩm cơ bản.
 * Có thể mở rộng thêm các trường (stock, description, …) nếu cần.
 */
export interface Product {
  /** Id duy nhất của sản phẩm (được trả về từ backend) */
  id: string;
  /** Tên hiển thị */
  name: string;
  /** Đường dẫn tới ảnh sản phẩm */
  image: string;
  /** Giá (đơn vị VND) */
  price: number;
}

/**
 * Một mục trong giỏ hàng.
 * `quantity` là số lượng người dùng đã chọn.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}
