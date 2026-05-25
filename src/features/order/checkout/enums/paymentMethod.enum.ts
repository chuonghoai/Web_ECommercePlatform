export const PaymentMethod = {
    COD: "COD",
    MOMO: "MOMO",
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];