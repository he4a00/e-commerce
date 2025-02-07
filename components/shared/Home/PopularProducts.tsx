"use client";

import { useGetTopProductsQuery } from "@/app/store/slices/api/products/productSlice";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import Loader from "../Loader";

const PopularProducts = () => {
  const { data: topProducts, isLoading } = useGetTopProductsQuery({});

  if (isLoading) {
    return (
      <div className="p-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pt-6 px-3 sm:gap-4 sm:pt-8 sm:px-4 md:gap-5 md:pt-10 md:px-6 xl:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold">
          Popular Products
        </h1>
      </div>
      {topProducts?.result?.items.length === 0 ? (
        <div className="p-4 sm:p-6 md:p-8">
          <p className="text-center text-gray-500 text-sm sm:text-base">
            No popular products found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5">
          {topProducts?.result?.items?.map((product: Product) => (
            <ProductCard
              key={product.productID}
              productFilesUrl={product.productFilesUrl}
              productId={product.productID}
              productName={product.productName}
              productDescription={product.productDescription}
              productPrice={product.productPrice}
              discount={product.discount}
              stockQuantity={product.stockQuantity}
              warrantyPeriod={product.warrantyPeriod}
              color={product.color}
              modelNumber={product.modelNumber}
              brandName={product.brandName}
              categoryName={product.categoryName}
              productInWishlist={product.productInWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
