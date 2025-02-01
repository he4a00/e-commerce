/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetParentCategoriesQuery } from "@/app/store/slices/api/categories/cateogrySlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ParentCategoriesSelect = ({ value, onChange }: any) => {
  const { data, isLoading, error } = useGetParentCategoriesQuery({});

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error loading categories!</div>;
  }

  const categories = data?.result || [];

  return (
    <Select
      value={value || "none"} // Fallback to "none" if the value is not set
      onValueChange={(val) => {
        onChange(val); // Update the form value
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose The Parent Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">No Parent Category</SelectItem>
        {categories.map((category: any) => (
          <SelectItem key={category.categoryID} value={category.categoryID}>
            {category.categoryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
