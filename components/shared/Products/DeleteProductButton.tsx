"use client";

import { useDeleteProductMutation } from "@/app/store/slices/api/products/productSlice";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DeleteProductButton = ({ id }: { id: string }) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation({});

  return (
    <Button
      className="bg-red-500"
      disabled={isLoading}
      onClick={() => deleteProduct(id)}
    >
      <Trash />
    </Button>
  );
};

export default DeleteProductButton;
