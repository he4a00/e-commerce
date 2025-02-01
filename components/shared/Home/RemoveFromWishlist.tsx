"use client"

import { useRemoveProductFromWishlistMutation } from '@/app/store/slices/api/wishlist/wishlistSlice'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import React from 'react'

const RemoveFromWishlist = ({ productID }: { productID: string }) => {
  const [removeProductFromWishlist, { isLoading }] =
    useRemoveProductFromWishlistMutation();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => removeProductFromWishlist(productID)}
      disabled={isLoading}
    >
      <Trash2 className="w-5 h-5 text-gray-500" />
    </Button>
  );
};

export default RemoveFromWishlist