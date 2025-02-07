"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import FilterByPriceRange from "../Filters/FilterByPriceRange";
import FilterByBrandName from "../Filters/FilterByBrandName";
import FilterBySubCategoryName from "../Filters/FilterBySubCategory";

interface FiltersSidebarProps {
  onPriceRangeChange: (values: [number, number]) => void;
  onBrandChange: (name: string, checked: boolean) => void;
  onSubCategoryChange?: (subCategoryName: string, checked: boolean) => void;
}

export default function FiltersSidebar({
  onPriceRangeChange,
  onBrandChange,
  onSubCategoryChange,
}: FiltersSidebarProps) {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6">
      <div className="space-y-6">
        <FilterByPriceRange onPriceChange={onPriceRangeChange} />

        {/* Brand Filter */}
        <FilterByBrandName onBrandChange={onBrandChange} />

        {/* Sub Category Filter */}
        {onSubCategoryChange && (
          <FilterBySubCategoryName onSubCategoryChange={onSubCategoryChange} />
        )}

        {/* Rating Filter */}
        {/* <div>
          <h3 className="text-base font-medium mb-2">Rating</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Checkbox />
              <span className="flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-sm">(128)</span>
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox />
              <span className="flex items-center">
                {[1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star className="w-4 h-4 text-gray-300" />
                <span className="ml-2 text-sm">(89)</span>
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox />
              <span className="flex items-center">
                {[1, 2, 3].map((rating) => (
                  <Star
                    key={rating}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {[1, 2].map((rating) => (
                  <Star key={rating} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="ml-2 text-sm">(64)</span>
              </span>
            </label>
          </div>
        </div> */}

        {/* Filter Button - Show only on mobile */}
        <div className="md:hidden">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
