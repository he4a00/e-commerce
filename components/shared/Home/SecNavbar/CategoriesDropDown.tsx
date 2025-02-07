"use client";

import { useGetParentCategoriesQuery } from "@/app/store/slices/api/categories/cateogrySlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigUp, Boxes } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  categoryID: string;
  categoryName: string;
  categoryImageURL: string;
}
const CategoriesDropDown = () => {
  const { data: allCategories } = useGetParentCategoriesQuery({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <h1 className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md font-semibold">
          {" "}
          <Boxes /> Browse All Categories <ArrowBigUp />
        </h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid grid-cols-2 gap-x-20 gap-y-2">
        {allCategories?.result?.map((category: Category) => (
          <Link
            key={category.categoryID}
            href={`/categories/category-products/${category.categoryID}`}
          >
            <DropdownMenuItem
              key={category.categoryID}
              className="flex items-center gap-2 border"
            >
              {category.categoryName}
              <DropdownMenuShortcut>
                <Image
                  className="rounded-full object-contain"
                  src={category.categoryImageURL}
                  alt={category.categoryName}
                  width={30}
                  height={30}
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropDown;
