"use client";
import { useEditCategoryMutation } from "@/app/store/slices/api/categories/cateogrySlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface EditCategoryButtonProps {
  CategoryID: string;
  newCategoryName: string;
  newCategoryImage: string;
  newParentCategoryID: string;
}

export default function EditCategoryButton({
  CategoryID,
  newCategoryName,
  newCategoryImage,
  newParentCategoryID,
}: EditCategoryButtonProps) {
  const { toast } = useToast();
  const [updateCategory, { isLoading, isSuccess }] = useEditCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Category Has Been Edited successfully",
      });
    }
  }, [isSuccess, toast]);

  const handleUpdate = async () => {
    try {
      await updateCategory({
        CategoryID,
        newCategoryName,
        newCategoryImage,
        newParentCategoryID,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return (
    <Button className="bg-blue-500" disabled={isLoading} onClick={handleUpdate}>
      {isLoading ? "Updating..." : "Update"}
    </Button>
  );
}
