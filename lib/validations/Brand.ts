import { z } from "zod";

export const BrandValidation = z.object({
  brandName: z.string().nonempty().min(2),
});
