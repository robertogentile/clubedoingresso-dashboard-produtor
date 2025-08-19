import { z } from "zod";

// Admin - Promoters
export const adminPromoterItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(["ativo", "inativo"]).or(z.string()),
});
export const adminPromotersResponseSchema = z.array(adminPromoterItemSchema);

export const adminCreatePromoterSchema = z.object({
  eventId: z.number(),
  name: z.string().min(1),
  slug: z.string().min(1),
  status: z.enum(["ativo", "inativo"]),
});

export const adminChangePromoterSchema = z.object({
  promoterId: z.number(),
  eventId: z.number(),
  status: z.enum(["ativo", "inativo"]),
});

// Admin - Coupons
export const adminCouponItemSchema = z.object({
  id: z.number(),
  description: z.string(),
  code: z.string(),
  status: z.enum(["ativo", "inativo"]).or(z.string()),
});
export const adminCouponsResponseSchema = z.array(adminCouponItemSchema);

export const adminCreateCouponSchema = z.object({
  eventId: z.number(),
  producerId: z.number(),
  description: z.string().min(1),
  code: z.string().min(1),
  useType: z.enum(["Unico", "Indeterminado"]),
  useLimit: z.number().int().nonnegative(),
  discountType: z.enum(["porcentagem", "reais"]),
  discountValue: z.string().min(1),
  status: z.enum(["ativo", "inativo"]),
});

export const adminChangeCouponSchema = z.object({
  couponId: z.number(),
  eventId: z.number(),
  status: z.enum(["ativo", "inativo"]),
});

// Admin - Batches
export const adminBatchItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["ativo", "inativo"]).or(z.string()),
  quantity: z.number(),
});
export const adminBatchesResponseSchema = z.array(adminBatchItemSchema);

export const adminCreateBatchSchema = z.object({
  eventId: z.number(),
  producerId: z.number(),
  name: z.string().min(1),
  quantity: z.number().int().nonnegative(),
  price: z.number().nonnegative(),
});

export const adminChangeBatchSchema = z.object({
  batchId: z.number(),
  producerId: z.number(),
  eventId: z.number(),
  status: z.enum(["ativo", "inativo"]),
});

export const adminChangeBatchQuantitySchema = z.object({
  batchId: z.number(),
  producerId: z.number(),
  eventId: z.number(),
  quantity: z.number().int().nonnegative(),
});

// Admin - Courtesy eligible batches
export const adminCourtesyBatchItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["ativo", "inativo"]).or(z.string()),
});
export const adminCourtesyBatchesResponseSchema = z.array(
  adminCourtesyBatchItemSchema
);

export const adminCreateCourtesySchema = z.object({
  eventId: z.number(),
  producerId: z.number(),
  email: z.string().email(),
  cart: z
    .array(
      z.object({
        batchId: z.number(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});

// Admin - Settings
export const adminUpdateMetaSchema = z.object({
  eventId: z.number(),
  producerId: z.number(),
  metaPixel: z.string().min(1),
  metaToken: z.string().min(1),
});

export const adminUpdateGoogleAnalyticsSchema = z.object({
  eventId: z.number(),
  producerId: z.number(),
  gaId: z.string().min(1),
  gaSecret: z.string().min(1),
  measurementId: z.string().min(1),
  gtmId: z.string().min(1),
});

export const adminEndSaleSchema = z.object({
  eventId: z.number(),
  producerId: z.number(),
});
