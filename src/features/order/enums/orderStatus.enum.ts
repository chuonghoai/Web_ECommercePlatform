export const EOrderStatus = {
    PENDING: 'PENDING',
    PAID: 'PAID',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
    RETURNED: 'RETURNED',
} as const;
export type EOrderStatus = typeof EOrderStatus[keyof typeof EOrderStatus];