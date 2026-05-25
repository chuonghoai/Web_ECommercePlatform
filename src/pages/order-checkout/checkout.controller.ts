import { useState, useEffect, useCallback, useRef } from "react";
import { useCheckoutStore } from "./checkout.store";
import type { PrepareCheckoutRequest } from "../../features/order/checkout/dto/prepareCheckout.dto";
import { PaymentMethod } from "../../features/order/checkout/enums/paymentMethod.enum";

export const useCheckoutController = (initialRequest: PrepareCheckoutRequest[]) => {
    const store = useCheckoutStore();
    const hasFetched = useRef(false);

    // UI Local States
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
    const [selectedVoucher, setSelectedVoucher] = useState("");
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isAddNewAddressModalOpen, setIsAddNewAddressModalOpen] = useState(false);

    // Init data
    useEffect(() => {
        if (initialRequest && initialRequest.length > 0 && !hasFetched.current) {
            store.fetchPrepareOrder(initialRequest);
            hasFetched.current = true;
        }
    }, [store.fetchPrepareOrder, initialRequest]);

    // Open edit address modal and set new address
    const handleSelectAddress = (address: any) => {
        if (store.data) {
            store.setData({ ...store.data, address });
        }
        setIsAddressModalOpen(false);
    };

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
        selectedVoucher,
        setSelectedVoucher,

        isPaymentModalOpen,
        setIsPaymentModalOpen,
        selectedPaymentMethod,
        setSelectedPaymentMethod,

        isAddressModalOpen,
        setIsAddressModalOpen,
        handleSelectAddress,

        isAddNewAddressModalOpen,
        setIsAddNewAddressModalOpen,

        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveItem,

        handleOrderSubmit
    };
};