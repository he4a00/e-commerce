"use client";

import {
  useGetProductsByBrandQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByParentCategoryQuery,
  useGetProductsByPriceRangeQuery,
} from "@/app/store/slices/api/products/productSlice";
import FiltersSidebar from "@/components/shared/Home/FiltersSidebar";
import ProductCard from "@/components/shared/Home/ProductCard";
import Loader from "@/components/shared/Loader";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const CategoryProducts = () => {
  const { id } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const { data: parentCategoryProducts, isLoading: isParentLoading } =
    useGetProductsByParentCategoryQuery(id as string);
  const { data: subCategoryProducts, isLoading: isSubLoading } =
    useGetProductsByCategoryQuery(selectedSubCategory as string, {
      skip: !selectedSubCategory,
    });
  const { data: priceFilteredProducts, isLoading: isPriceLoading } =
    useGetProductsByPriceRangeQuery({
      Min: priceRange[0],
      Max: priceRange[1],
    });

  const { data: brandFilteredProducts } = useGetProductsByBrandQuery(
    selectedBrand as string,
    {
      skip: !selectedBrand,
    }
  );

  if (isParentLoading || isSubLoading || isPriceLoading) {
    return <Loader />;
  }

  const handleSubCategoryChange = (name: string, checked: boolean) => {
    setSelectedSubCategory(checked ? name : "");
  };

  const handlePriceRangeChange = (values: [number, number]) => {
    setPriceRange(values);
  };

  const handleBrandChange = (name: string, checked: boolean) => {
    setSelectedBrand(checked ? name : "");
  };

  const displayProducts =
    priceRange[0] !== 0 || priceRange[1] !== 1000
      ? priceFilteredProducts?.result?.items
      : selectedBrand
      ? brandFilteredProducts?.result?.items
      : selectedSubCategory
      ? subCategoryProducts?.result?.items
      : parentCategoryProducts?.result?.items;

  return (
    <div className="container mx-auto px-4 pt-10 w-full min-h-screen">
      {/* items number found and the sub category filter */}
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between">
        {/* Items Found */}
        <div>
          <h1>
            We Found{" "}
            <span className="font-semibold text-green-500">
              {displayProducts?.length || 0}
            </span>{" "}
            Items For You!
          </h1>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-4">
          {/* Mobile filter button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <FiltersSidebar
                  onPriceRangeChange={handlePriceRangeChange}
                  onBrandChange={handleBrandChange}
                  onSubCategoryChange={handleSubCategoryChange}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Products grid and sidebar layout */}
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 mt-8">
        {/* Main products grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayProducts?.map((product: Product) => (
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
            />
          ))}
        </div>
        {/* Sidebar filters - desktop */}
        <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow h-fit sticky top-4">
          <FiltersSidebar
            onPriceRangeChange={handlePriceRangeChange}
            onBrandChange={handleBrandChange}
            onSubCategoryChange={handleSubCategoryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
