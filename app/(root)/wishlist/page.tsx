"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useGetUserWishlistQuery } from "@/app/store/slices/api/wishlist/wishlistSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RemoveFromWishlist from "@/components/shared/Home/RemoveFromWishlist";

interface WishlistProduct {
  categoryName: string;
  productID: string;
  productName: string;
  productPrice: number;
  productImageURL: string;
  isInStock: boolean;
}

export default function Wishlist() {
  const { data: wishlistProducts } = useGetUserWishlistQuery({});

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Your Wishlist</h1>
      <p className="text-slate-600 mb-8">
        There are{" "}
        <span className="text-emerald-500 font-medium">
          {wishlistProducts?.result.length}
        </span>{" "}
        products in this list
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead className="w-[70px]">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wishlistProducts?.result.map(
              (product: WishlistProduct, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-lg border p-2">
                        <Image
                          src={product.productImageURL || "/placeholder.svg"}
                          alt={product.productName}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-emerald-500 font-medium mb-1">
                          {product.productName}
                        </h3>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-emerald-500 font-medium">
                      ${product.productPrice}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full text-emerald-500 bg-emerald-50 text-sm">
                      {product.isInStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <RemoveFromWishlist productID={product.productID} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
