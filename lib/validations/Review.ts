import { z } from "zod";

export const ReviewValidation = z.object({
  ReviewText: z.string().min(1, "Review text is required"),
  Rating: z.number().min(1).max(5),
  ProductID: z.string().uuid("Invalid ProductID format"), // Enforce UUID
});