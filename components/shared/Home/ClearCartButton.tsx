"use client";

import { useClearCartMutation } from "@/app/store/slices/api/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ClearCart = () => {
  const [clearCart, { isLoading }] = useClearCartMutation();
  return (
    <Button
      variant="destructive"
      className="w-fit p-2 text-center"
      size="icon"
      onClick={clearCart}
      disabled={isLoading}
    >
      Clear Cart <Trash2 className="w-5 h-5" />
    </Button>
  );
};

export default ClearCart;
