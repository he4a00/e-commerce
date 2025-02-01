"use client";

import React, { useState } from "react";
import { useSearchProductByNameQuery } from "@/app/store/slices/api/products/productSlice";
import Image from "next/image";
import { Product } from "@/types";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: searchResults } = useSearchProductByNameQuery(searchTerm);

  return (
    <div className="relative">
      <Input
        value={searchTerm}
        className=""
        type="text"
        placeholder="Search for items"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm &&
        searchResults &&
        searchResults.result?.items.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md max-h-96 overflow-y-auto z-50">
            {searchResults.result.items.map((product: Product) => (
              <Link
                key={product.productID}
                href={`/products/${product.productID}`}
              >
                <div
                  key={product.productID}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                >
                  {product.productFilesUrl && (
                    <Image
                      src={product.productFilesUrl[0]}
                      alt={product.productName}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">{product.productName}</p>
                    <p className="text-sm text-gray-600">
                      ${product.productPrice}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
};

export default SearchInput;
