import { z } from "zod";

export const EventSchema = z.object({
  id: z.number(),
  status: z.string(),
  banner: z.string().url().nullable(),
  sell_start: z.string(),
  name: z.string(),
  url: z.string(),
  date: z.string(),
  opening_hour: z.string(),
  password: z.string(),
  meta_pixel: z.string(),
  meta_token: z.string(),
  ga_id: z.string(),
  ga_secret: z.string(),
  ga_measurement_id: z.string(),
  gtm_id: z.string().nullable(),
  currency: z.string(),
  location: z.string(),
  producer_type: z.string(),
});

export const EventsResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    upcoming: z.array(EventSchema),
    past: z.array(EventSchema),
  }),
});

export type Event = z.infer<typeof EventSchema>;
export type EventsResponse = z.infer<typeof EventsResponseSchema>;
