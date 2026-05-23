import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../features/cart/contexts/CartContext';
import { formatVND } from '../../features/cart/services/cart.service';
import { useToast } from '../../components/toast/toast';
import { userStorageService } from '../../features/user/services/userStorage.service';



export const useCartController = () => {
  const { items, totalPrice, updateQuantity, removeItem, isLoading, loadCart } = useCart();

  const [coupon, setCoupon] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!userStorageService.getUser()) {
      toast("Bạn cần đăng nhập để sử dụng chức năng này", "warning");
      navigate('/login');
    }
    else {
      loadCart();
    }
  }, [navigate, toast, loadCart]);

  const finalTotal = totalPrice;
  const totalMakers = new Set(items.map(item => item.product.id)).size;

  const handleCheckout = () => {
    navigate("/order/checkout")
  };

  return {
    items,
    totalPrice,
    finalTotal,
    totalMakers,
    isLoading,
    coupon,
    setCoupon,
    updateQuantity,
    removeItem,
    formatMoney: formatVND
  };
};
