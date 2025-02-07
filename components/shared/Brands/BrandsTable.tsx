"use client";
import { useGetAllBrandsQuery } from "@/app/store/slices/api/brands/brandSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Brand } from "@/types";
import DeleteBrandName from "./DeleteBrandButton";
import EditModal from "../Modal";
import Loader from "../Loader";

export function BrandsTable() {
  const { data: allBrands, isLoading } = useGetAllBrandsQuery({});

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table>
      <TableCaption>
        {allBrands?.result.length === 0
          ? "No brands found"
          : "A list of your recent brands."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Brand name</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allBrands?.result?.map((brand: Brand) => (
          <TableRow key={brand.brandID}>
            <TableCell className="font-medium">{brand.brandName}</TableCell>
            <TableCell className="text-right">
              <div className="m-2 flex gap-3 justify-end items-center">
                <DeleteBrandName brandID={brand.brandID || ""} />
                <EditModal
                  brandID={brand.brandID || ""}
                  brandName={brand.brandName}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
