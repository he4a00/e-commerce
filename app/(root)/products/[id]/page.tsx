/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/app/store/slices/api/products/productSlice";
import ReviewsList from "@/components/shared/Reviews/ReviewsList";
import AddToWishlist from "@/components/shared/Home/AddToWishlist";
import { useGetUserWishlistQuery } from "@/app/store/slices/api/wishlist/wishlistSlice";
import AddReviewForm from "@/components/shared/Reviews/AddReviewForm";
import AddToCart from "@/components/shared/Home/AddToCart";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: productData } = useGetProductByIdQuery(id as string);
  const { data: wishlistData } = useGetUserWishlistQuery({});

  console.log(productData);

  console.log(productData);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = productData?.result?.productFilesUrl || [];

  // Check if current product is in wishlist
  const isInWishlist = wishlistData?.result?.some(
    (item: any) => item.productID === productData?.result?.productID
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt="Product image"
              fill
              className="object-contain p-4"
              priority
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"
            >
              <span className="sr-only">Zoom image</span>🔍
            </Button>
          </div>
          <div className="flex space-x-4 overflow-auto pb-2 justify-center">
            {productImages.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                  selectedImage === index ? "ring-2 ring-emerald-500" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-100">
            {productData?.result?.promotionLabel}
          </Badge>

          <h1 className="text-3xl font-bold text-slate-800">
            {productData?.result?.productName}
          </h1>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => {
              const ratingValue = productData?.result?.avgRating || 0;
              return (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i + 1 <= Math.floor(ratingValue)
                      ? "fill-yellow-400 text-yellow-400" // full star
                      : i < ratingValue
                      ? "fill-yellow-400/50 text-yellow-400" // partial star
                      : "fill-gray-200 text-gray-200" // empty star
                  }`}
                />
              );
            })}
            <span className="text-sm text-gray-500">
              ({productData?.result?.totalReviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-emerald-600">
              ${productData?.result?.productPriceAfterDiscount}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ${productData?.result?.productPrice}
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {productData?.result?.discount}% Off
            </span>
          </div>

          <p className="text-gray-600">
            {productData?.result?.productDescription}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <AddToCart
                brandName={productData?.result?.brandName}
                productID={productData?.result?.productID}
                productName={productData?.result?.productName}
                stockQuantity={productData?.result?.stockQuantity}
                pictureUrl={productData?.result?.productFilesUrl[0]}
                price={productData?.result?.productPrice}
              />
              <AddToWishlist
                productID={productData?.result?.productID}
                isInWishlist={Boolean(isInWishlist)}
              />

              <Button size="icon" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 divide-y">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Brand:
                </span>
                <span className="text-sm text-emerald-600">
                  {productData?.result?.brandName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Color:
                </span>
                <span className="text-sm text-gray-600">
                  {productData?.result?.color}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Warranty:
                </span>
                <span className="text-sm text-gray-600">
                  {productData?.result?.warrantyPeriod}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Model Number:
                </span>
                <span className="text-sm text-emerald-600">
                  {productData?.result?.modelNumber}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <span className="text-sm font-medium text-gray-700">Stock:</span>
              <span className="text-sm text-emerald-600">
                {productData?.result?.stockQuantity} Items In Stock
              </span>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <span className="text-sm font-medium text-gray-700">
                Categories:
              </span>
              <span className="text-sm text-gray-600">
                {productData?.result?.categoryName}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-sm border">
          <h1 className="text-2xl font-semibold text-gray-900">
            Write a Review
          </h1>
          <div className="border-t pt-6">
            <AddReviewForm ProductID={id as string} />
          </div>
        </div>
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-sm border">
          <h1 className="text-2xl font-semibold text-gray-900">
            Customer Reviews
          </h1>
          <div className="border-t pt-6">
            <ReviewsList productID={id as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
