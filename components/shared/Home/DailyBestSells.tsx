"use client";

import { useGetAllProductsQuery } from "@/app/store/slices/api/products/productSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import Link from "next/link";

const DailyBestSells = () => {
  const { data: allProducts, isLoading } = useGetAllProductsQuery({
    PageIndex: 1,
    PageSize: 10,
    SortBy: "productName",
    SortDirection: "asc",
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="p-8">
      <div className="max-w-7xl space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Daily Best Sells
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Banner Section */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl group h-[250px] sm:h-[350px] md:h-[400px] lg:h-auto lg:w-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
            <Image
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              src="/images/banner-2.png"
              alt="Fresh Products Banner"
              width={600}
              height={800}
              priority
            />
            <div className="absolute inset-0 z-20 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-xs">
                Everyday Fresh & Clean with Our Products
              </h3>
              <Link href="/deals">
                <Button
                  size="lg"
                  className="w-fit bg-green-500 hover:bg-green-600 text-white transition-colors text-sm sm:text-base"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="lg:w-1/2">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {allProducts?.result?.items?.map((product: Product) => (
                  <CarouselItem
                    key={product.productID}
                    className="pl-2 sm:pl-4 basis-full xs:basis-1/2 lg:basis-1/2 gap-5"
                  >
                    <div className="p-1">
                      <ProductCard
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
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-end gap-2 mt-2 sm:mt-4 px-2 sm:px-4">
                <CarouselPrevious className="static translate-x-0 translate-y-0 h-8 w-8 sm:h-10 sm:w-10 hover:bg-primary hover:text-white" />
                <CarouselNext className="static translate-x-0 translate-y-0 h-8 w-8 sm:h-10 sm:w-10 hover:bg-primary hover:text-white" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyBestSells;
