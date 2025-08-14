import { z } from "zod";

export const accountSchema = z.object({
  id: z.number(),
  name: z.string(),
  document: z.string(),
  bank: z.string(),
  agency: z.string(),
  account: z.string(),
});

export const accountsResponseSchema = z.array(accountSchema);

export const createAccountSchema = z.object({
  producerId: z.number(),
  name: z.string().min(3, "O nome do titular é obrigatório."),
  document: z.string().min(11, "O documento (CPF/CNPJ) é inválido."),
  bank: z.string().min(1, "O nome do banco é obrigatório."),
  agency: z.string().min(1, "A agência é obrigatória."),
  account: z.string().min(1, "O número da conta é obrigatório."),
});

// Finance GET responses

// GET /producer/receipts
export const receiptItemSchema = z.object({
  id: z.number(),
  date: z.string(),
  description: z.string(),
  value: z.number(),
  receipt: z.string().nullable(),
});
export const receiptsResponseSchema = z.array(receiptItemSchema);

// GET /producer/payment-methods-resume
export const paymentMethodItemSchema = z.object({
  total: z.number(),
  payment_method: z.string(),
  installment_type: z.string(),
  percentage: z.number(),
});
export const paymentMethodsResponseSchema = z.array(paymentMethodItemSchema);

// GET /producer/receipt-resume
export const receiptResumeResponseSchema = z.object({
  sells: z.number(),
  receipts: z.number(),
  remaining: z.number(),
});

// GET /producer/check-payment-availability
export const checkPaymentAvailabilityResponseSchema = z.object({
  antecipation: z.boolean(),
});

// GET /producer/send-sms-token
export const sendSmsTokenResponseSchema = z.object({
  id: z.string(),
  token: z.number(),
});

// GET /producer/pix
export const pixKeySchema = z.object({
  id: z.number(),
  producerId: z.number(),
  name: z.string(),
  type: z.string(),
  value: z.string(),
});
export const pixResponseSchema = z.array(pixKeySchema);

// GET /producer/coupons
export const couponItemSchema = z.object({
  coupon_id: z.number(),
  qtd: z.number(),
  total_value: z.number(),
  quantity: z.number(),
  code: z.string(),
  currency: z.string(),
});
export const couponsResponseSchema = z.array(couponItemSchema);

// GET /producer/promoters
export const promoterItemSchema = z.object({
  name: z.string(),
  slug: z.string(),
  promoter_id: z.number(),
  total: z.number(),
  taxes: z.number(),
  total_tickets: z.number(),
  batch_name: z.string(),
});
export const promotersResponseSchema = z.array(promoterItemSchema);
