export const EPaymentMethod = {
    COD: "COD",
    MOMO: "MOMO",
} as const;
export type EPaymentMethod = (typeof EPaymentMethod)[keyof typeof EPaymentMethod];