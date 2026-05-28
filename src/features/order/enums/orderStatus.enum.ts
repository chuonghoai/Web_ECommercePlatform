export const EOrderStatus = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
    RETURNED: 'RETURNED',
} as const;
export type EOrderStatus = typeof EOrderStatus[keyof typeof EOrderStatus];