/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllSubCategoriesQuery } from "@/app/store/slices/api/categories/cateogrySlice";

const SelectCategoryForProduct = ({ field }: { field: any }) => {
  const { data: categories } = useGetAllSubCategoriesQuery({});
  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Choose Category" />
      </SelectTrigger>
      <SelectContent>
        {categories?.result?.map((category: any) => (
          <SelectItem key={category.categoryID} value={category.categoryID}>
            {category.categoryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCategoryForProduct;
