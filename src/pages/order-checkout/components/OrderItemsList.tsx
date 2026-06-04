import React from 'react';
import type { PrepareCheckoutModel } from '../../../features/order/checkout/models/checkout.model';

interface OrderItemsListProps {
    items: PrepareCheckoutModel['items'];
    invalidItems: PrepareCheckoutModel['invalidItems'];
    onRemove: (productId: string) => void;
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({
    items,
    invalidItems,
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
                            className={`flex flex-col sm:flex-row gap-4 pb-4 ${idx !== items.length - 1 ? 'border-b border-subtle' : ''}`}
                        >
                            {/* Product image */}
                            <div className={`w-full sm:w-32 h-32 shrink-0 bg-surface-container rounded-lg overflow-hidden transition-opacity ${isInvalid ? 'opacity-50 grayscale' : ''}`}>
                                <img alt={item.product.name} className="w-full h-full object-cover" src={item.product.imageUrl} />
                            </div>

                            {/* Product details */}
                            <div className="grow flex flex-col justify-between">
                                <div>
                                    <h3 className={`font-subhead text-lg ${isInvalid ? 'line-through text-text-muted font-normal' : 'text-text-ink'}`}>
                                        {item.product.name}
                                    </h3>

                                    {!isInvalid && item.product.discountPercentage > 0 ? (
                                        <p className="font-caption text-primary mt-1">Giảm {item.product.discountPercentage}%</p>
                                    ) : !isInvalid && item.product.discountPercentage === 0 && item.product.price < item.product.originalPrice ? (
                                        <p className="font-caption text-primary mt-1">
                                            Giảm {(item.product.originalPrice - item.product.price).toLocaleString('vi-VN')}₫
                                        </p>
                                    ) : null}
                                </div>

                                <div className="flex items-center justify-end mt-2 sm:mt-0">
                                    <div className="text-right">
                                        {isInvalid ? (
                                            <p className="font-body font-medium text-error">{invalidInfo.reason}</p>
                                        ) : (
                                            <>
                                                {item.product.originalPrice > item.product.price && (
                                                    <p className="font-caption text-text-muted line-through">{item.product.originalPrice.toLocaleString('vi-VN')}₫</p>
                                                )}
                                                <p className="font-body font-semibold text-text-ink">
                                                    {item.product.price.toLocaleString('vi-VN')}₫ <span className="text-text-muted font-normal">x {item.quantity}</span>
                                                </p>
                                                <p className="font-body-sm font-semibold text-primary-container mt-1">Thành tiền: {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Button remove items */}
                            {isInvalid && (
                                <div className="sm:shrink-0 flex items-start justify-end pt-2 sm:pt-0">
                                    <button
                                        type="button"
                                        aria-label="Remove item"
                                        className="transition-colors flex items-center gap-1 rounded-lg font-caption py-1.5 px-3 text-text-muted hover:text-error"
                                        onClick={() => onRemove(item.product.id)}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                                        <span>Xóa</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};