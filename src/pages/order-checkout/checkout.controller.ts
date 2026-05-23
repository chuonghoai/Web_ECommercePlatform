import { useState, useEffect, useCallback } from "react";
import { useCheckoutStore } from "./checkout.store";
import type { PrepareCheckoutRequest } from "../../features/order/checkout/dto/checkout.dto";

export const useCheckoutController = () => {
    const store = useCheckoutStore();

    // UI Local States
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
    const [selectedVoucher, setSelectedVoucher] = useState("NEST200");

    // Init data
    useEffect(() => {
        const initialRequest: PrepareCheckoutRequest[] = [
            { productId: "1", quantity: 1 },
            { productId: "2", quantity: 2 }
        ];
        store.fetchPrepareOrder(initialRequest);
    }, [store.fetchPrepareOrder]);

    // Increase item quantity
    const handleIncreaseQuantity = useCallback((productId: string) => {
        if (!store.data) return;
        const updatedItems = store.data.items.map(item => {
            if (item.product.id === productId) {
                const newQty = item.quantity + 1;
                return {
                    ...item,
                    quantity: newQty,
                    amount: newQty * item.product.price
                };
            }
            return item;
        });

        recalculateTotals(updatedItems);
    }, [store]);

    // Decrease item quantity
    const handleDecreaseQuantity = useCallback((productId: string) => {
        if (!store.data) return;
        const updatedItems = store.data.items.map(item => {
            if (item.product.id === productId && item.quantity > 1) {
                const newQty = item.quantity - 1;
                return {
                    ...item,
                    quantity: newQty,
                    amount: newQty * item.product.price
                };
            }
            return item;
        });

        recalculateTotals(updatedItems);
    }, [store]);

    // Remove item
    const handleRemoveItem = useCallback((productId: string) => {
        if (!store.data) return;
        const updatedItems = store.data.items.filter(item => item.product.id !== productId);
        recalculateTotals(updatedItems);
    }, [store]);

    // Recalculate total amount locally when UI changes quantity
    const recalculateTotals = (updatedItems: any[]) => {
        if (!store.data) return;
        const subTotal = updatedItems.reduce((acc, item) => acc + item.amount, 0);
        store.setData({
            ...store.data,
            items: updatedItems,
            subTotal,
            totalAmount: subTotal + store.data.shippingFee
        });
    };

    // Submit order
    const handleOrderSubmit = useCallback(() => {
        if (!store.data) return;
        alert(`Đặt hàng thành công!\nTổng tiền: ${store.data.totalAmount.toLocaleString('vi-VN')}₫\nPhương thức: ${selectedPaymentMethod}`);
    }, [store.data, selectedPaymentMethod]);

    return {
        data: store.data,
        loading: store.loading,
        error: store.error,
        isVoucherModalOpen,
        setIsVoucherModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedVoucher,
        setSelectedVoucher,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveItem,
        handleOrderSubmit
    };
};