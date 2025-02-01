"use client";

import { useAddProductToWishlistMutation } from "@/app/store/slices/api/wishlist/wishlistSlice";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const AddToWishlist = ({
  productID,
  isInWishlist,
}: {
  productID: string;
  isInWishlist: boolean;
}) => {
  const [addProductToWishlist, { isLoading }] =
    useAddProductToWishlistMutation();
  return (
    <Button
      variant="secondary"
      size="icon"
      className={`hover:bg-green-400 dark:hover:bg-gray-800/90 shadow-lg h-12 px-7 bg-green-500 ${
        isInWishlist ? "bg-red-700" : ""
      }`}
      onClick={() => addProductToWishlist(productID)}
      disabled={isLoading || isInWishlist}
    >
      <Heart
        className={`h-10 w-10 transition-colors duration-300  text-white`}
      />
    </Button>
  );
};

export default AddToWishlist;
