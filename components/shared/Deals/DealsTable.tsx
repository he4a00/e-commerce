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
import { Deal } from "@/types";
import Loader from "../Loader";
import { useGetAllDealsQuery } from "@/app/store/slices/api/deals/dealSlice";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import DeleteDealButton from "./DeleteDealButton";

export function DealsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: allDeals, isLoading } = useGetAllDealsQuery({
    PageIndex: currentPage,
    PageSize: pageSize,
    SortBy: "ProductName",
    SortDirection: "ASC",
  });

  const totalPages = allDeals?.result?.totalPages || 1;

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
        <TableCaption>A list of your recent brands.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product Name</TableHead>
            <TableHead>Deal Discount</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDeals?.result?.items.map((deal: Deal) => (
            <TableRow key={deal.dealID}>
              <TableCell className="font-medium">{deal.productName}</TableCell>
              <TableCell className="font-medium">{deal.discount}</TableCell>
              <TableCell className="font-medium">
                {new Date(deal.startDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </TableCell>
              <TableCell className="font-medium">
                {new Date(deal.endDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </TableCell>
              <TableCell className="font-medium">
                {deal.isActive ? "Active" : "Not Active"}
              </TableCell>
              <TableCell className="text-right">
                <div className="m-2 flex gap-3 justify-end items-center">
                  <DeleteDealButton id={deal.dealID || ""} />
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
