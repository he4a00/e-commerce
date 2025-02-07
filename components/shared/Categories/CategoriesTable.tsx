"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "../Loader";
import { useGetAllCategoriesQuery } from "@/app/store/slices/api/categories/cateogrySlice";
import DeleteCategoryButton from "./DeleteCateoryButton";
import Image from "next/image";
import EditCategoryModal from "./EditCategoryModal";

interface Category {
  categoryID: string;
  categoryName: string;
  categoryImageURL: string;
  parentCategoryID: string | null;
  parentCategoryName: string | null;
}

export function CategoriesTable() {
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery({});

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table>
      <TableCaption>
        {allCategories?.result.length === 0
          ? "No categories found"
          : "A list of your recent categories."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Category Image</TableHead>
          <TableHead className="w-[200px]">Category Name</TableHead>
          <TableHead className="">Parent Category Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allCategories?.result?.map((category: Category) => (
          <TableRow key={category.categoryID}>
            <TableCell>
              <Image
                src={category.categoryImageURL}
                alt={category.categoryName}
                width={50}
                height={50}
                className="rounded-full"
              />
            </TableCell>
            <TableCell className="font-medium">
              {category.categoryName}
            </TableCell>
            <TableCell className="">
              {category.parentCategoryName === null
                ? "No Parent Category"
                : category.parentCategoryName}
            </TableCell>
            <TableCell className="text-right">
              <div className="m-2 flex gap-3 justify-end items-center">
                <DeleteCategoryButton id={category.categoryID} />
                <EditCategoryModal
                  CategoryID={category.categoryID}
                  CategoryImage={category.categoryImageURL}
                  CategoryName={category.categoryName}
                  ParentCategoryID={category.parentCategoryID || ""}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
