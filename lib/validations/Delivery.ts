import { z } from "zod";

export const DeliveryValidation = z.object({
  shortName: z
    .string()
    .min(3, { message: "Short name must be at least 3 characters" }),
  price: z.number().min(0, { message: "Price must be greater than 0" }),
  deliveryTime: z
    .string()
    .min(3, { message: "Delivery time must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
});
