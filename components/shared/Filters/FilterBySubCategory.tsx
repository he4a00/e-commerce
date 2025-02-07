/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllSubCategoriesQuery } from "@/app/store/slices/api/categories/cateogrySlice";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

interface FilterBySubCategoryProps {
  onSubCategoryChange: (categoryID: string, checked: boolean) => void;
}

const FilterBySubCategoryName = ({
  onSubCategoryChange,
}: FilterBySubCategoryProps) => {
  const { data: categories } = useGetAllSubCategoriesQuery({});
  const [selectedSubCategory, setSelectedSubCateogry] = useState<string>("");

  const handleSubCategoryChange = (categoryID: string, checked: boolean) => {
    setSelectedSubCateogry(checked ? categoryID : "");
    onSubCategoryChange(categoryID, checked);
  };

  console.log(categories);

  return (
    <div>
      <h3 className="text-base font-medium mb-2">Category</h3>
      <div className="space-y-2">
        {categories?.result.map((subCat: any) => (
          <label
            key={subCat.categoryID}
            className="flex items-center space-x-2"
          >
            <Checkbox
              checked={selectedSubCategory === subCat.categoryID}
              onCheckedChange={(checked) =>
                handleSubCategoryChange(subCat.categoryID, checked as boolean)
              }
            />
            <span className="text-sm">{subCat.categoryName}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterBySubCategoryName;
