import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface FilterByPriceRangeProps {
  onPriceChange: (values: [number, number]) => void;
}

const FilterByPriceRange = ({ onPriceChange }: FilterByPriceRangeProps) => {
  const [priceRange, setPriceRange] = useState([500, 1000]);

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    onPriceChange(values as [number, number]);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Price Range</h3>
      <Slider
        defaultValue={[500, 1000]}
        max={1000}
        min={0}
        step={100}
        className="mb-2"
        onValueChange={handlePriceRangeChange}
        value={priceRange}
        color="green"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>From: ${priceRange[0]}</span>
        <span>To: ${priceRange[1]}</span>
      </div>
    </div>
  );
};

export default FilterByPriceRange;
