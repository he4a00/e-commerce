import { z } from "zod";

export const DealValidation = z.object({
  discount: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  productID: z.string(),
});
