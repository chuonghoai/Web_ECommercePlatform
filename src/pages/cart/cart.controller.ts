import { useState } from 'react';
import { useCart } from '../../features/cart/contexts/CartContext';
import { formatVND } from '../../features/cart/services/cart.service';

// Dữ liệu mock phục vụ UI design system (sẽ xóa khi Backend trả về đầy đủ qua API)
export const mockMakerData: Record<string, any> = {
  p1: {
    maker: "Elena Silva",
    avatar: "https://i.pravatar.cc/150?u=elena",
    location: "Da Lat, Vietnam",
    tags: ["Hand-thrown stoneware", "Lead-free glaze"],
    story: "Made in small batches by local artisans."
  },
  p2: {
    maker: "Khai Nguyen",
    avatar: "https://i.pravatar.cc/150?u=khai",
    location: "Hoi An, Vietnam",
    tags: ["Natural cotton", "Plant-dyed"],
    story: "Woven on traditional wooden looms."
  }
};

export const useCartController = () => {
  // Lấy state và action từ Store
  const { items, totalPrice, updateQuantity, removeItem, isLoading } = useCart();
  
  // Local UI State
  const [coupon, setCoupon] = useState("");

  // Computed State (Logic tính toán UI)
  const shippingFee = items.length > 0 ? 35000 : 0;
  const finalTotal = totalPrice + shippingFee;
  const totalMakers = new Set(items.map(item => item.product.id)).size; // Giả lập đếm số maker

  // Handlers
  const handleApplyCoupon = () => {
    console.log("Applying coupon:", coupon);
    // Logic apply sau này
  };

  const handleCheckout = () => {
    console.log("Proceed to checkout...");
    // Redirect logic
  };

  return {
    // Data
    items,
    totalPrice,
    shippingFee,
    finalTotal,
    totalMakers,
    isLoading,
    coupon,
    mockMakerData,
    // Actions
    setCoupon,
    updateQuantity,
    removeItem,
    handleApplyCoupon,
    handleCheckout,
    // Format Utils (để UI gọi gọn hơn)
    formatMoney: formatVND
  };
};
