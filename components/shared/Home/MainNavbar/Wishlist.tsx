"use client";

import { useGetUserWishlistQuery } from "@/app/store/slices/api/wishlist/wishlistSlice";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Wishlist = () => {
  const { data: userWishlist } = useGetUserWishlistQuery({});
  return (
    <div className="flex items-center gap-2">
      <Link className="flex items-center gap-2 relative" href="/wishlist">
      <Heart className="h-5 w-5" />
      <span className="sr-only">Wishlist</span>
        <Badge className="text-xs text-white bg-green-500 absolute bottom-[0.7rem] left-[0.5rem] rounded-full w-5 h-5 flex items-center justify-center">
          {userWishlist?.result?.length}
        </Badge>
      </Link>
    </div>
  );
};

export default Wishlist;
