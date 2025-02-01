"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Store, Tag, Info, Package, Eye } from "lucide-react";
import Link from "next/link";
import AddToWishlist from "./AddToWishlist";
import AddToCart from "./AddToCart";

interface ProductCardProps {
  productId: string;
  productFilesUrl: string[];
  productName: string;
  productDescription: string;
  productPrice: number;
  discount: number;
  stockQuantity: number;
  warrantyPeriod?: number;
  color?: string;
  modelNumber: number;
  brandName: string;
  categoryName: string;
  productInWishlist?: boolean;
}

export default function ProductCard({
  productId,
  productFilesUrl,
  productName,
  productPrice,
  discount,
  stockQuantity,
  warrantyPeriod,
  color,
  modelNumber,
  brandName,
  categoryName,
  productInWishlist,
}: ProductCardProps) {
  const discountedPrice = productPrice - productPrice * (discount / 100);

  return (
    <Card className="w-[300px] h-[500px] backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-none shadow-xl hover:shadow-2xl transition-all duration-500 relative group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Carousel className="w-full">
          <CarouselContent>
            {productFilesUrl?.map((file) => (
              <CarouselItem key={file}>
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
                  <Image
                    src={file || "/placeholder.svg"}
                    alt={productName}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    priority
                  />
                </div>
              </CarouselItem>
            )) || (
              <CarouselItem>
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
                  <Image
                    src="/placeholder.svg"
                    alt={productName}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Carousel>

        {discount > 0 && (
          <div className="absolute top-0 rounded z-10">
            <Badge className="text-sm py-1 bg-red-500/90 backdrop-blur-sm bg-green-500 text-white">
              Save {discount}%
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="details" className="flex-1">
              <Info className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="specs" className="flex-1">
              <Package className="w-4 h-4 mr-2" />
              Specs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {productName}
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1 flex flex-row items-center gap-x-2">
                  <div className="text-2xl font-bold text-primary">
                    ${discountedPrice.toFixed(2)}
                  </div>
                  {discount > 0 && (
                    <div className="text-sm text-muted-foreground line-through">
                      ${productPrice.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={stockQuantity > 0 ? "default" : "secondary"}
                    className={`
                      ${stockQuantity > 0 ? "bg-green-500/90" : "bg-red-500/90"}
                      backdrop-blur-sm px-2.5 py-1
                    `}
                  >
                    <Store className="w-4 h-4 mr-1.5" />
                    {stockQuantity > 0
                      ? `${stockQuantity} in stock`
                      : "Out of stock"}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="mt-0">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-2.5 py-1">
                  <Tag className="w-4 h-4 mr-1.5" />
                  {brandName}
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1">
                  Model {modelNumber}
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1">
                  {categoryName}
                </Badge>
              </div>

              {warrantyPeriod && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  {warrantyPeriod} months warranty
                </div>
              )}

              {color && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-muted-foreground">{color}</span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex flex-row gap-2 items-center justify-center">
          <AddToCart
            brandName={brandName}
            productID={productId}
            productName={productName}
            stockQuantity={stockQuantity}
            pictureUrl={productFilesUrl[0]}
            price={productPrice}
            variant="simple"
          />
          <AddToWishlist
            productID={productId}
            isInWishlist={productInWishlist || false}
          />

          <Link href={`/products/${productId}`}>
            <Button
              variant="secondary"
              size="icon"
              className=" hover:bg-green-400 dark:hover:bg-gray-800/90 shadow-lg h-12 px-7 bg-green-500"
            >
              <Eye className=" text-xl transition-colors duration-300  text-white " />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
