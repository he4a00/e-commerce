import { z } from "zod";

export const ProductValidation = z.object({
  ProductFiles: z.array(z.instanceof(File)).optional(),
  ProductName: z
    .string()
    .min(1, { message: "Product Name can't be blank." })
    .nonempty("Product Name can't be blank."),
  ProductDescription: z
    .string()
    .min(1, { message: "Product Description can't be blank." })
    .nonempty("Product Description can't be blank."),
  ProductPrice: z
    .number()
    .min(0.01, { message: "Product Price must be greater than 0." }), // Changed from 0 to 0.01
  Discount: z.number().min(0, { message: "Discount must be greater than 0" }),
  StockQuantity: z
    .number()
    .min(1, { message: "Stock Quantity must be greater than 0" }), // Changed from 0 to 1
  WarrantyPeriod: z.number().optional(),
  Color: z.string().optional(),
  ModelNumber: z
    .number()
    .min(0, { message: "Model number must be greater than 0" }),
  BrandID: z.string().min(1, { message: "Brand ID is required" }),
  CategoryID: z.string().min(1, { message: "Category ID is required" }),
});
