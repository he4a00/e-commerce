/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CategoryValidation } from "@/lib/validations/Category";
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
import {
  useCreateCateogryMutation,
  useGetParentCategoriesQuery,
} from "@/app/store/slices/api/categories/cateogrySlice";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";

export const AddCategoryForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetParentCategoriesQuery({});
  const categories = categoriesData?.result || [];

  const form = useForm<z.infer<typeof CategoryValidation>>({
    resolver: zodResolver(CategoryValidation),
    defaultValues: {
      CategoryImage: "",
      CategoryName: "",
      parentCategoryID: "none",
    },
  });

  const [createCategory, { isLoading, isSuccess }] =
    useCreateCateogryMutation();

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      redirect("/admin/categories");
    }
  }, [isSuccess, form]);

  function onSubmit(values: z.infer<typeof CategoryValidation>) {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("CategoryImage", imageFile);
    formData.append("CategoryName", values.CategoryName);

    // Convert "none" to null
    const parentCategoryID =
      values.parentCategoryID === "none" ? "" : values.parentCategoryID;
    formData.append("parentCategoryID", parentCategoryID);
    createCategory(formData);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="CategoryImage"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="file-input"
                    onChange={(e) => {
                      handleImageChange(e);
                      onChange(e.target.value);
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="CategoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Electronics" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parentCategoryID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <FormControl>
                  {categoriesLoading ? (
                    <div>Loading categories...</div>
                  ) : categoriesError ? (
                    <div>Error loading categories!</div>
                  ) : (
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose The Parent Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Parent Category</SelectItem>
                        {categories.map((category: any) => (
                          <SelectItem
                            key={category.categoryID}
                            value={category.categoryID}
                          >
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Category"}
          </Button>

          <Link href="/admin">
            <Button variant="outline" className="w-full">
              Back to Dashboard
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default AddCategoryForm;
