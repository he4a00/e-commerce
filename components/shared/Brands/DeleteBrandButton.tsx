"use client";

import { useDeleteBrandMutation } from "@/app/store/slices/api/brands/brandSlice";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DeleteBrandName = ({ brandID }: { brandID: string }) => {
  const [deleteBrand, { isLoading }] = useDeleteBrandMutation({});

  return (
    <Button
      className="bg-red-500"
      disabled={isLoading}
      onClick={() => deleteBrand(brandID)}
    >
      <Trash />
    </Button>
  );
};

export default DeleteBrandName;
