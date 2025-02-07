"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loader from "../Loader";
import { useGetAllProductsQuery } from "@/app/store/slices/api/products/productSlice";
import DeleteProductButton from "./DeleteProductButton";
import { Edit2, Handshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  productID: string;
  productName: string;
  productPrice: number;
  categoryName: string;
  brandName: string;
  avgRating: number;
  discount: number;
  productPriceAfterDiscount: number;
}

export function ProductsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: allProducts, isLoading } = useGetAllProductsQuery({
    PageIndex: currentPage,
    PageSize: pageSize,
    SortBy: "ProductName",
    SortDirection: "ASC",
  });

  const totalPages = allProducts?.result?.totalPages || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>
          {allProducts?.result.items.length === 0
            ? "No products found"
            : "A list of your recent products."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Product Name</TableHead>
            <TableHead className="">Product Price</TableHead>
            <TableHead className="">Brand Name</TableHead>
            <TableHead className="">Category Name</TableHead>
            <TableHead className="">Average Rating</TableHead>
            <TableHead className="">Discount</TableHead>
            <TableHead className="">Product Price After Discount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allProducts?.result?.items?.map((product: Product) => (
            <TableRow key={product.productID}>
              <TableCell className="font-medium">
                {product.productName}
              </TableCell>
              <TableCell className="">{product.productPrice}</TableCell>
              <TableCell className="">{product.brandName}</TableCell>
              <TableCell className="">{product.categoryName}</TableCell>
              <TableCell className="">{product.avgRating}</TableCell>
              <TableCell className="">{product.discount}</TableCell>
              <TableCell className="">
                {product.productPriceAfterDiscount}
              </TableCell>
              <TableCell className="text-right">
                <div className="m-2 flex gap-3 justify-end items-center">
                  <DeleteProductButton id={product.productID} />
                  <Link
                    href={`/admin/products/edit-product/${product.productID}`}
                  >
                    <Button className="bg-blue-500">
                      <Edit2 />
                    </Button>
                  </Link>
                  <Link href={`/admin/deals/add-deal/${product.productID}`}>
                    <Button className="bg-green-500">
                      <Handshake className="text-white" />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {renderPaginationItems()}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
