"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types";
import AddToCart from "@/components/shared/Home/AddToCart";

export default function DealCard({
  endDate,
  productName,
  productPriceAfterDiscount,
  productPrice,
  productImageUrl,
  isInStock,
  discount,
  totalOrders,
  totalReviews,
  avgRating,
  brandName,
  productID,
}: Deal) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <Card className="w-[300px] backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-none shadow-xl hover:shadow-2xl transition-all duration-500 relative group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
          <Image
            src={productImageUrl || "/placeholder.svg"}
            alt={productName || ""}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-green-500/90 backdrop-blur-sm p-3">
            <div className="flex justify-around text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs">Mins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs">Sec</div>
              </div>
            </div>
          </div>
        </div>

        {discount > 0 && (
          <div className="absolute top-0 rounded z-10">
            <Badge className="text-sm py-1 bg-red-500/90 backdrop-blur-sm text-white">
              Save {discount}%
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">
              {productName}
            </h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{avgRating?.toFixed(1)}</span>
                <span>({totalReviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <ShoppingBag className="w-4 h-4 text-green-500" />
                <span>{totalOrders} sold</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">
                ${productPriceAfterDiscount?.toFixed(2)}
              </div>
              {discount > 0 && (
                <div className="text-sm text-muted-foreground line-through">
                  ${productPrice?.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-row gap-5 items-center justify-center">
          <AddToCart
            brandName={brandName || ""}
            productID={productID}
            productName={productName || ""}
            stockQuantity={isInStock ? 1 : 0}
            pictureUrl={productImageUrl || ""}
            price={productPriceAfterDiscount || 0}
            variant="simple"
          />
        </div>
      </CardContent>
    </Card>
  );
}
