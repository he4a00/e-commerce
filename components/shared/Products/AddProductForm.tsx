/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
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
import { useCreateProductMutation } from "@/app/store/slices/api/products/productSlice";
import SelectCategoryForProduct from "./SelectCategoryForProduct";
import SelectBrandForProduct from "./SelectBrandForProduct";
import { Create_Product } from "@/types";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export const AddProductForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      ProductFiles: [],
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

  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      redirect("/admin/products");
      form.reset();
    }
  }, [isSuccess, form]);

  function onSubmit(values: z.infer<typeof ProductValidation>) {
    if (!imageFiles.length) return;

    const formData = new FormData();

    imageFiles.forEach((file) => {
      formData.append(`ProductFiles`, file);
    });

    // Append other form values
    formData.append("ProductName", values.ProductName);
    formData.append("ProductDescription", values.ProductDescription);
    formData.append("ProductPrice", values.ProductPrice.toString());
    formData.append("Discount", values.Discount.toString());
    formData.append("StockQuantity", values.StockQuantity.toString());
    formData.append("ModelNumber", values.ModelNumber.toString());
    formData.append("BrandID", values.BrandID);
    formData.append("CategoryID", values.CategoryID);
    if (values.WarrantyPeriod) {
      formData.append("WarrantyPeriod", values.WarrantyPeriod.toString());
    }
    if (values.Color) {
      formData.append("Color", values.Color);
    }

    createProduct(formData as unknown as Create_Product)
      .unwrap()
      .then((response) => {
        form.reset();
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  }

  return (
    <div className="max-w-md border w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formValues = form.getValues();
            onSubmit(formValues);
          }}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="ProductFiles"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    multiple={true}
                    accept="image/*"
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files) {
                        const filesArray = Array.from(files);
                        setImageFiles(filesArray);
                        onChange(filesArray);
                        form.setValue("ProductFiles", filesArray);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <Textarea {...field} placeholder="Product Description" />
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
            {isLoading ? "Adding..." : "Add Product"}
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

export default AddProductForm;
