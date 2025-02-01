"use client";

import { useRemoveProductFromCartMutation } from "@/app/store/slices/api/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

const RemoveFromCart = ({ productID }: { productID: string }) => {
  const [removeProductFromCart, { isLoading }] =
    useRemoveProductFromCartMutation();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => removeProductFromCart(productID)}
      disabled={isLoading}
    >
      <Trash2 className="w-5 h-5 text-gray-500" />
    </Button>
  );
};

export default RemoveFromCart;
