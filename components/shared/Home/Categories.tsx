"use client";

import { useGetParentCategoriesQuery } from "@/app/store/slices/api/categories/cateogrySlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ParentCategory } from "@/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Loader from "../Loader";
import Link from "next/link";

export default function Categories() {
  const { data: parentCategories, isLoading } = useGetParentCategoriesQuery({});

  if (isLoading) {
    return <Loader />;
  }

  console.log(parentCategories);
  return (
    <div className="w-full pt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Shop by Categories</h2>
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900 text-xl font-semibold"
        >
          All Categories <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {parentCategories?.result?.map((category: ParentCategory) => (
            <CarouselItem
              key={category.categoryID}
              className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5"
            >
              <Link
                href={`/categories/category-products/${category.categoryID}`}
              >
                <Card className="border-none shadow-sm hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow bg-gray-100 hover:bg-white">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="w-16 h-16 mb-4">
                      <Image
                        src={category.categoryImageURL || "/placeholder.svg"}
                        alt={category.categoryName}
                        className="object-contain"
                        width={100}
                        height={100}
                      />
                    </div>
                    <h1 className="text-center text-lg font-semibold text-gray-700 whitespace-pre-line">
                      {category.categoryName}
                    </h1>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  );
}
