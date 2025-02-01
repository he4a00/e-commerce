"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllBrandsQuery } from "@/app/store/slices/api/brands/brandSlice";

const SelectBrandForProduct = ({ field }: { field: any }) => {
  const { data: brands } = useGetAllBrandsQuery({});
  return (
    <Select
      value={field.value}
      onValueChange={field.onChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose Brand" />
      </SelectTrigger>
      <SelectContent>
        {brands?.result?.map((brand: any) => (
          <SelectItem key={brand.brandID} value={brand.brandID}>
            {brand.brandName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBrandForProduct;
