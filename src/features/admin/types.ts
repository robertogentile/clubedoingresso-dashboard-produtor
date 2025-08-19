import { z } from "zod";
import {
  adminPromoterItemSchema,
  adminCreatePromoterSchema,
  adminCouponItemSchema,
  adminCreateCouponSchema,
  adminBatchItemSchema,
  adminCreateBatchSchema,
  adminCourtesyBatchItemSchema,
} from "./schema";

export type AdminPromoterItem = z.infer<typeof adminPromoterItemSchema>;
export type AdminCreatePromoterPayload = z.infer<
  typeof adminCreatePromoterSchema
>;

export type AdminCouponItem = z.infer<typeof adminCouponItemSchema>;
export type AdminCreateCouponPayload = z.infer<typeof adminCreateCouponSchema>;

export type AdminBatchItem = z.infer<typeof adminBatchItemSchema>;
export type AdminCreateBatchPayload = z.infer<typeof adminCreateBatchSchema>;

export type AdminCourtesyBatchItem = z.infer<
  typeof adminCourtesyBatchItemSchema
>;
