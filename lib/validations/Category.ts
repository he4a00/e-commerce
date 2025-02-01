import * as z from "zod";

export const CategoryValidation = z.object({
  CategoryImage: z.string(),
  CategoryName: z
    .string()
    .min(2, "Category name must be at least 2 characters"),
    parentCategoryID: z.string().default("none"),
});
