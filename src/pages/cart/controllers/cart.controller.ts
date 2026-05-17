import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../features/cart/contexts/CartContext';
import { formatVND } from '../../../features/cart/services/cart.service';
import { tokenService } from '../../../core/auth/token.service';
import { useToast } from '../../../components/toast/toast';

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
  const { items, totalPrice, updateQuantity, removeItem, isLoading } = useCart();
  
  const [coupon, setCoupon] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!tokenService.getAccessToken()) {
      toast("Bạn cần đăng nhập để sử dụng chức năng này", "warning");
      navigate('/login');
    }
  }, [navigate, toast]);

  const shippingFee = items.length > 0 ? 35000 : 0;
  const finalTotal = totalPrice + shippingFee;
  const totalMakers = new Set(items.map(item => item.product.id)).size;

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", coupon);
  };

  const handleCheckout = () => {
    console.log("Proceed to checkout...");
  };

  return {
    items,
    totalPrice,
    shippingFee,
    finalTotal,
    totalMakers,
    isLoading,
    coupon,
    mockMakerData,
    setCoupon,
    updateQuantity,
    removeItem,
    handleApplyCoupon,
    handleCheckout,
    formatMoney: formatVND
  };
};
