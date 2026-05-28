import { useState, useEffect, useCallback, useRef } from "react";
import { useCheckoutStore } from "./checkout.store";
import type { PrepareCheckoutRequest } from "../../features/order/checkout/dto/prepareCheckout.dto";
import { EPaymentMethod } from "../../features/order/enums/paymentMethod.enum";
import { useToast } from "../../components/toast/toast";
import { useNavigate } from "react-router-dom";
import type { CheckoutRequestDto } from "../../features/order/checkout/dto/checkoutRequest.dto";
import { useCart } from "../../features/cart/contexts/CartContext";
import { cartService } from "../../features/cart/services/cart.service";

export const useCheckoutController = (initialRequest: PrepareCheckoutRequest[]) => {
    const store = useCheckoutStore();
    const hasFetched = useRef(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { loadCart } = useCart();

    // UI Local States
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<EPaymentMethod>(EPaymentMethod.COD);
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

    // ReInit data
    const handleRetry = useCallback(() => {
        if (initialRequest && initialRequest.length > 0) {
            store.fetchPrepareOrder(initialRequest);
        }
    }, [initialRequest, store]);

    // Open edit address modal and set new address
    const handleSelectAddress = (address: any) => {
        if (store.data) {
            store.setData({ ...store.data, address });

            const currentRequest: PrepareCheckoutRequest[] = store.data.items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }));

            if (store.data.invalidItems && store.data.invalidItems.length > 0) {
                store.data.invalidItems.forEach(invalidItem => {
                    const original = initialRequest.find(req => req.productId === invalidItem.productId);
                    currentRequest.push({
                        productId: invalidItem.productId,
                        quantity: original ? original.quantity : 1
                    });
                });
            }

            store.fetchPrepareOrder(currentRequest);
        }
        setIsAddressModalOpen(false);
    };

    // Remove item
    const handleRemoveItem = useCallback((productId: string) => {
        if (!store.data) return;
        const updatedItems = store.data.items.filter(item => item.product.id !== productId);

        const updatedInvalidItems = store.data.invalidItems?.filter(invalid => invalid.productId !== productId) || [];

        const remainingRequest: PrepareCheckoutRequest[] = [
            ...updatedItems.map(item => ({ productId: item.product.id, quantity: item.quantity })),
            ...updatedInvalidItems.map(invalid => {
                const original = initialRequest.find(req => req.productId === invalid.productId);
                return { productId: invalid.productId, quantity: original ? original.quantity : 1 };
            })
        ];

        if (remainingRequest.length > 0) {
            store.fetchPrepareOrder(remainingRequest);
        } else {
            store.setData({
                ...store.data,
                items: updatedItems,
                invalidItems: updatedInvalidItems,
                subTotal: 0,
                totalAmount: 0
            });
        }
    }, [store, initialRequest]);

    // Submit order
    const handleOrderSubmit = useCallback(async () => {
        if (!store.data) return;
        if (store.data.invalidItems && store.data.invalidItems.length > 0) {
            toast("Có sản phẩm không hợp lệ trong đơn hàng, vui lòng kiểm tra lại", "warning");
            return;
        }

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
        };

        // Gọi API
        const result = await store.submitCheckout(payload);

        if (result) {
            await loadCart();
            await cartService.syncCartCount();

            if (result.paymentRequired && result.payUrl) {
                window.location.href = result.payUrl;
            } else {
                navigate(`/order/checkout/result?orderId=${result.orderId}`);
            }
        } else if (store.error) {
            toast(store.error || "Có lỗi xảy ra, vui lòng thử lại", "error");
        }
    }, [store, selectedPaymentMethod, navigate, toast, loadCart]);

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

        handleRemoveItem,
        handleRetry,
        handleOrderSubmit
    };
};