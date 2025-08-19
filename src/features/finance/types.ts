import { z } from "zod";
import {
  accountSchema,
  createAccountSchema,
  receiptItemSchema,
  paymentMethodItemSchema,
  receiptResumeResponseSchema,
  checkPaymentAvailabilityResponseSchema,
  pixKeySchema,
  couponItemSchema,
  promoterItemSchema,
  createPixSchema,
  deletePixParamsSchema,
  deleteAccountParamsSchema,
  requestPaymentSchema,
} from "./schema";

export type Account = z.infer<typeof accountSchema>;
export type CreateAccountPayload = z.infer<typeof createAccountSchema>;
export type Receipt = z.infer<typeof receiptItemSchema>;
export type PaymentMethodItem = z.infer<typeof paymentMethodItemSchema>;
export type ReceiptResume = z.infer<typeof receiptResumeResponseSchema>;
export type CheckPaymentAvailability = z.infer<
  typeof checkPaymentAvailabilityResponseSchema
>;
export type PixKey = z.infer<typeof pixKeySchema>;
export type CouponItem = z.infer<typeof couponItemSchema>;
export type PromoterItem = z.infer<typeof promoterItemSchema>;

export type CreatePixPayload = z.infer<typeof createPixSchema>;
export type DeletePixParams = z.infer<typeof deletePixParamsSchema>;
export type DeleteAccountParams = z.infer<typeof deleteAccountParamsSchema>;
export type RequestPaymentPayload = z.infer<typeof requestPaymentSchema>;
