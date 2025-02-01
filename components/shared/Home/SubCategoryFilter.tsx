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

interface SubCategoryFilterProps {
  onSubCategoryChange: (value: string) => void;
}

const SubCategoryFilter = ({ onSubCategoryChange }: SubCategoryFilterProps) => {
  const { data: categories } = useGetAllSubCategoriesQuery({});

  const handleValueChange = (value: string) => {
    onSubCategoryChange(value);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Choose Sub Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">All Products</SelectItem>
        {categories?.result?.map((category: any) => (
          <SelectItem key={category.categoryID} value={category.categoryID}>
            {category.categoryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubCategoryFilter;
