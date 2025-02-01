"use client";

import { useDeleteCategoryMutation } from "@/app/store/slices/api/categories/cateogrySlice";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DeleteCategoryButton = ({ id }: { id: string }) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation({});

  return (
    <Button
      className="bg-red-500"
      disabled={isLoading}
      onClick={() => deleteCategory(id)}
    >
      <Trash />
    </Button>
  );
};

export default DeleteCategoryButton;
