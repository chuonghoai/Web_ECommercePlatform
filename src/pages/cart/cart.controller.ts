import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../features/cart/contexts/CartContext';
import { formatVND } from '../../features/cart/services/cart.service';
import { useToast } from '../../components/toast/toast';
import { userStorageService } from '../../features/user/services/userStorage.service';



export const useCartController = () => {
  const { items, totalPrice, updateQuantity, removeItem, isLoading } = useCart();

  const [coupon, setCoupon] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!userStorageService.getUser()) {
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
    setCoupon,
    updateQuantity,
    removeItem,
    handleApplyCoupon,
    handleCheckout,
    formatMoney: formatVND
  };
};
