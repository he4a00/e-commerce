/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { ProductValidation } from "@/lib/validations/Product";
import {
  useEditProductMutation,
  useGetProductByIdQuery,
} from "@/app/store/slices/api/products/productSlice";
import SelectCategoryForProduct from "./SelectCategoryForProduct";
import SelectBrandForProduct from "./SelectBrandForProduct";
import { useParams } from "next/navigation";

export const EditProductForm = () => {
  const { id } = useParams();

  const { data: product } = useGetProductByIdQuery(id as string);

  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      ProductName: "",
      ProductDescription: "",
      ProductPrice: 0,
      Discount: 0,
      StockQuantity: 0,
      WarrantyPeriod: 0,
      Color: "",
      ModelNumber: 0,
      BrandID: "",
      CategoryID: "",
    },
  });

  useEffect(() => {
    if (product?.result) {
      form.reset({
        ProductName: product.result.productName,
        ProductDescription: product.result.productDescription,
        ProductPrice: product.result.productPrice,
        Discount: product.result.discount,
        StockQuantity: product.result.stockQuantity,
        WarrantyPeriod: product.result.warrantyPeriod,
        Color: product.result.color,
        ModelNumber: product.result.modelNumber,
        BrandID: product.result.brandID,
        CategoryID: product.result.categoryID,
      });
    }
  }, [product, form]);

  const [updateProduct, { isLoading }] = useEditProductMutation();

  async function onSubmit(values: z.infer<typeof ProductValidation>) {
    try {
      const result = await updateProduct({
        ProductID: id as string,
        ...values, // This spreads all the form values
      }).unwrap();
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  return (
    <div className="max-w-md border w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ProductName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Product Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ProductDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Product Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ProductPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Product Price"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Discount"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="StockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Stock Quantity"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="WarrantyPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Period</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Warranty Period"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="Color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Color" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ModelNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Model Number"
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="CategoryID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <SelectCategoryForProduct field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="BrandID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <SelectBrandForProduct field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Product"}
          </Button>

          <Link href="/admin">
            <Button variant="outline" className="w-full mt-2">
              Back to Dashboard
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default EditProductForm;
