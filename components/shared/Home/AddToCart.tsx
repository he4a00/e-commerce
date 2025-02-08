"use client";

import { useAddProductToCartMutation } from "@/app/store/slices/api/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AddToCartButtonProps {
  stockQuantity: number;
  productID: string;
  price: number;
  productName: string;
  quantity?: number;
  pictureUrl: string;
  brandName: string;
  variant?: "default" | "simple";
}

const AddToCart = ({
  stockQuantity,
  productID,
  productName,
  price,
  pictureUrl,
  brandName,
  variant = "default",
}: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState<string | null>(null);
  const [addProductToCart, { isLoading, isSuccess }] =
    useAddProductToCartMutation();
  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Product added successfully to your cart.",
      });
    }
  }, [isSuccess, toast]);

  const handleAddToCart = () => {
    addProductToCart({
      productID,
      productName,
      price,
      quantity,
      pictureUrl,
      brandName,
    });
  };

  const incrementQuantity = () => {
    if (quantity < stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const redirectToLogin = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {variant === "default" && (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-md p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={incrementQuantity}
            disabled={quantity >= stockQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Button
        className={`w-full h-12 text-base font-medium transition-all duration-300 flex-2 ${
          stockQuantity > 0
            ? "bg-green-500 hover:bg-green-400"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
        disabled={stockQuantity === 0 || isLoading}
        onClick={user ? handleAddToCart : redirectToLogin}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCart;
