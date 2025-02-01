"use client";

import { useGetTopProductsQuery } from "@/app/store/slices/api/products/productSlice";
import SelectCategoryForProduct from "../Products/SelectCategoryForProduct";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import Loader from "../Loader";

const PopularProducts = () => {
  const { data: topProducts, isLoading } = useGetTopProductsQuery({});

  console.log(topProducts);

  if (isLoading) {
    return (
      <div className="p-10">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 pt-10 px-4 md:px-6 xl:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Popular Products</h1>
        <SelectCategoryForProduct field="category" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3 pt-10">
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
    </div>
  );
};

export default PopularProducts;
