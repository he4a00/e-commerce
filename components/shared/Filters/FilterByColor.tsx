"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface FilterByColorProps {
  onColorsChange: (color: string) => void;
  selectedColor: string;
}

const AVAILABLE_COLORS = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "White",
  "Yellow",
  // Add more colors as needed
];

const FilterByColor = ({
  onColorsChange,
  selectedColor,
}: FilterByColorProps) => {
  const handleColorChange = (color: string, checked: boolean) => {
    onColorsChange(checked ? color : "");
  };

  return (
    <div>
      <h3 className="text-base font-medium mb-2">Colors</h3>
      <div className="space-y-2">
        {AVAILABLE_COLORS.map((color) => (
          <label key={color} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedColor === color}
              onCheckedChange={(checked) =>
                handleColorChange(color, checked as boolean)
              }
            />
            <span className="text-sm">{color}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByColor;
