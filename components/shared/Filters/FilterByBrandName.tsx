"use client";

import { useGetAllBrandsQuery } from "@/app/store/slices/api/brands/brandSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { Brand } from "@/types";
import React, { useState } from "react";

interface FilterByBrandNameProps {
  onBrandChange: (brandName: string, checked: boolean) => void;
}

const FilterByBrandName = ({ onBrandChange }: FilterByBrandNameProps) => {
  const { data: allBrands } = useGetAllBrandsQuery({});
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const handleBrandChange = (brandName: string, checked: boolean) => {
    setSelectedBrand(checked ? brandName : "");
    onBrandChange(brandName, checked);
  };

  console.log(allBrands);

  return (
    <div>
      <h3 className="text-base font-medium mb-2">Brand</h3>
      <div className="space-y-2">
        {allBrands?.result.map((brand: Brand) => (
          <label key={brand.brandID} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedBrand === brand.brandName}
              onCheckedChange={(checked) =>
                handleBrandChange(brand.brandName, checked as boolean)
              }
            />
            <span className="text-sm">
              {brand.brandName} ({brand.productLength})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByBrandName;
