"use client";

import { useGetUserCartQuery } from "@/app/store/slices/api/cart/cartSlice";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cart = () => {
  const { data: userCart } = useGetUserCartQuery({});

  return (
    <div className="flex items-center gap-2">
      <Link className="flex items-center gap-2 relative" href="/cart">
        <ShoppingCart className="h-5 w-5" />
        <Badge className="text-xs text-white bg-green-500 absolute bottom-[0.7rem] left-[0.5rem] rounded-full w-5 h-5 flex items-center justify-center">
          {userCart?.cartItems?.length}
        </Badge>
      </Link>
    </div>
  );
};

export default Cart;
