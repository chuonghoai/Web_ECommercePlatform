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
        <section className="flex-grow space-y-6 w-full lg:w-2/3">
            <h2 className="font-headline text-2xl text-text-ink border-b border-subtle pb-2">Giỏ hàng của bạn</h2>
            <div className="bg-surface-card card-border rounded-lg p-6 space-y-6">
                {items.map((item, idx) => (
                    <div key={item.product.id} className={`flex flex-col sm:flex-row gap-4 pb-4 ${idx !== items.length - 1 ? 'border-b border-subtle' : ''}`}>
                        <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden">
                            <img alt={item.product.name} className="w-full h-full object-cover" src={item.product.imageUrl} />
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                            <div>
                                <h3 className="font-subhead text-lg text-text-ink">{item.product.name}</h3>
                                {item.product.discountPercentage > 0 && (
                                    <p className="font-caption text-primary mt-1">Giảm {item.product.discountPercentage}%</p>
                                )}
                            </div>
                            <div className="flex items-center justify-between mt-2 sm:mt-0">
                                <div className="flex items-center border border-border-medium rounded">
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
                        </div>
                        <div className="sm:flex-shrink-0 flex items-start justify-end pt-2 sm:pt-0">
                            <button
                                aria-label="Remove item"
                                className="text-text-muted hover:text-error transition-colors flex items-center gap-1 font-caption"
                                onClick={() => onRemove(item.product.id)}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                                <span className="sm:hidden">Xóa</span>
                            </button>
                        </div>
                    </div>
                ))}

                {invalidItems.length > 0 && (
                    <div className="bg-error-container text-on-error-container p-4 rounded-lg mt-4">
                        <p className="font-bold mb-2">Sản phẩm không khả dụng:</p>
                        <ul className="list-disc pl-5">
                            {invalidItems.map(invalid => (
                                <li key={invalid.productId}>{invalid.productId} - {invalid.reason}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};