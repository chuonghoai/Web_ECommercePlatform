import { useState, useEffect, useCallback, useRef } from "react";
import { useCheckoutStore } from "./checkout.store";
import type { PrepareCheckoutRequest } from "../../features/order/checkout/dto/prepareCheckout.dto";
import { PaymentMethod } from "../../features/order/checkout/enums/paymentMethod.enum";
import { useToast } from "../../components/toast/toast";
import { useNavigate } from "react-router-dom";
import type { CheckoutRequestDto } from "../../features/order/checkout/dto/checkoutRequest.dto";

export const useCheckoutController = (initialRequest: PrepareCheckoutRequest[]) => {
    const store = useCheckoutStore();
    const hasFetched = useRef(false);
    const { toast } = useToast();
    const navigate = useNavigate();

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
    const handleOrderSubmit = useCallback(async () => {
        if (!store.data) return;
        if (!store.data.address) {
            toast("Vui lòng chọn địa chỉ giao hàng", "warning");
            return;
        }

        const payload: CheckoutRequestDto = {
            items: store.data.items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            })),
            addressId: store.data.address.id,
            paymentMethod: selectedPaymentMethod,
            // voucherIds: selectedVoucher ? [selectedVoucher] : undefined // Tạm thời chưa phát triển voucher
        };

        // Gọi API
        const result = await store.submitCheckout(payload);

        if (result) {
            if (result.paymentRequired && result.payUrl) {
                window.location.href = result.payUrl;
            } else {
                navigate(`/order/checkout/result?orderId=${result.orderId}`);
            }
        } else if (store.error) {
            toast(store.error || "Có lỗi xảy ra, vui lòng thử lại", "error");
        }
    }, [store, selectedPaymentMethod, navigate, toast]);

    return {
        data: store.data,
        loading: store.loading,
        error: store.error,

        isCheckingOut: store.isCheckingOut,

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