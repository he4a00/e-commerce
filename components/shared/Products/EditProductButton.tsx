"use client";
import { useEditProductMutation } from "@/app/store/slices/api/products/productSlice";
import { Button } from "@/components/ui/button";

interface EditProductButtonProps {
  ProductID: string;
  ProductName: string;
  ProductDescription: string;
  ProductPrice: number;
  Discount: number;
  StockQuantity: number;
  WarrantyPeriod: number;
  Color: string;
  ModelNumber: number;
  BrandID: string;
  CategoryID: string;
}

export default function EditProductButton({
  ProductID,
  ProductName,
  ProductDescription,
  ProductPrice,
  Discount,
  StockQuantity,
  WarrantyPeriod,
  Color,
  ModelNumber,
  BrandID,
  CategoryID,
}: EditProductButtonProps) {
  const [updateProduct, { isLoading }] = useEditProductMutation();

  const handleUpdate = async () => {
    try {
      await updateProduct({
        ProductID,
        ProductName,
        ProductDescription,
        ProductPrice,
        Discount,
        StockQuantity,
        WarrantyPeriod,
        Color,
        ModelNumber,
        BrandID,
        CategoryID,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <Button className="bg-blue-500" disabled={isLoading} onClick={handleUpdate}>
      {isLoading ? "Updating..." : "Update"}
    </Button>
  );
}
