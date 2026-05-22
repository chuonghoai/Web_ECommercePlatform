import React from 'react';
import type { PrepareCheckoutModel } from '../../../features/order/checkout/models/checkout.model';

interface OrderItemsListProps {
    items: PrepareCheckoutModel['items'];
    invalidItems: PrepareCheckoutModel['invalidItems'];
    onIncrease: (productId: string) => void;
    onDecrease: (productId: string) => void;
    onRemove: (productId: string) => void;
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({
    items,
    invalidItems,
    onIncrease,
    onDecrease,
    onRemove
}) => {
    return (
        <section className="w-full space-y-6">
            <h2 className="font-headline text-2xl text-text-ink border-b border-subtle pb-2">Giỏ hàng của bạn</h2>
            <div className="bg-surface-card card-border rounded-lg p-6 space-y-6">
                {items.map((item, idx) => {
                    const invalidInfo = invalidItems?.find(invalid => invalid.productId === item.product.id);
                    const isInvalid = !!invalidInfo;

                    return (
                        <div
                            key={item.product.id}
                            className={`flex flex-col sm:flex-row gap-4 pb-4 ${idx !== items.length - 1 ? 'border-b border-subtle' : ''
                                } ${isInvalid ? 'bg-surface-container-high/60 dark:bg-surface-container/40 p-4 rounded-lg border border-error/20 shadow-inner transition-all' : ''
                                }`}
                        >
                            {/* Product image */}
                            <div className={`w-full sm:w-32 h-32 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden ${isInvalid ? 'opacity-50 grayscale' : ''}`}>
                                <img alt={item.product.name} className="w-full h-full object-cover" src={item.product.imageUrl} />
                            </div>

                            {/* Product details */}
                            <div className="flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className={`font-subhead text-lg text-text-ink ${isInvalid ? 'line-through text-text-muted font-normal' : ''}`}>
                                        {item.product.name}
                                    </h3>

                                    {/* Invalid message */}
                                    {isInvalid ? (
                                        <div className="mt-3 flex flex-col gap-1 text-error font-body-sm bg-error-container/20 px-3 py-2 rounded-lg w-fit">
                                            <div className="flex items-center gap-1 font-semibold">
                                                <span className="material-symbols-outlined text-sm" style={{ fontSize: '16px' }}>warning</span>
                                                <span>Sản phẩm không khả dụng</span>
                                            </div>
                                            <span className="pl-5">Lý do: {invalidInfo.reason}</span>
                                        </div>
                                    ) : item.product.discountPercentage > 0 ? (
                                        <p className="font-caption text-primary mt-1">Giảm {item.product.discountPercentage}%</p>
                                    ) : item.product.discountPercentage === 0 && item.product.price < item.product.originalPrice ? (
                                        <p className="font-caption text-primary mt-1">
                                            Giảm {(item.product.originalPrice - item.product.price).toLocaleString('vi-VN')}₫
                                        </p>
                                    ) : null}
                                </div>

                                {/* Valid product: Modify quantity */}
                                {!isInvalid && (
                                    <div className="flex items-center justify-between mt-2 sm:mt-0">
                                        <div className="flex items-center border border-border-medium rounded bg-surface">
                                            <button
                                                aria-label="Decrease quantity"
                                                className="px-2 py-1 text-text-muted hover:text-primary transition-colors"
                                                onClick={() => onDecrease(item.product.id)}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span>
                                            </button>
                                            <span className="font-body-sm px-2 text-text-ink">{item.quantity}</span>
                                            <button
                                                aria-label="Increase quantity"
                                                className="px-2 py-1 text-text-muted hover:text-primary transition-colors"
                                                onClick={() => onIncrease(item.product.id)}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            {item.product.originalPrice > item.product.price && (
                                                <p className="font-caption text-text-muted line-through">{item.product.originalPrice.toLocaleString('vi-VN')}₫</p>
                                            )}
                                            <p className="font-body font-semibold text-text-ink">{item.product.price.toLocaleString('vi-VN')}₫</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Button remove items */}
                            <div className="sm:flex-shrink-0 flex items-start justify-end pt-2 sm:pt-0">
                                <button
                                    type="button"
                                    aria-label="Remove item"
                                    className={`transition-colors flex items-center gap-1 rounded-lg ${isInvalid
                                        ? 'btn-primary py-2 px-4 text-sm font-semibold shadow-md'
                                        : 'font-caption py-1.5 px-3 text-text-muted hover:text-error'
                                        }`}
                                    onClick={() => onRemove(item.product.id)}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                                    <span>{isInvalid ? 'Xóa khỏi đơn hàng' : 'Xóa'}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};