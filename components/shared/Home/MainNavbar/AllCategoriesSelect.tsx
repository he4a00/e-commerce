"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetParentCategoriesQuery } from "@/app/store/slices/api/categories/cateogrySlice";

interface AllCategoriesSelectProps {
  categoryID: string;
  categoryName: string;
}
const AllCategoriesSelect = () => {
  const { data: categories } = useGetParentCategoriesQuery({});
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Choose Category" />
      </SelectTrigger>
      <SelectContent>
        {categories?.result?.map((category: AllCategoriesSelectProps) => (
          <SelectItem key={category.categoryID} value={category.categoryID}>
            {category.categoryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AllCategoriesSelect;
