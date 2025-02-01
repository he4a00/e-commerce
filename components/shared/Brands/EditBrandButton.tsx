"use client";
import { useUpdateBrandMutation } from "@/app/store/slices/api/brands/brandSlice";
import { Button } from "@/components/ui/button";

const EditBrandButton = ({
  brandID,
  newBrandName,
}: {
  brandID: string;
  newBrandName: string;
}) => {
  const [updateBrand, { isLoading }] = useUpdateBrandMutation();

  const handleUpdate = async () => {
    try {
      await updateBrand({ brandID, newBrandName }).unwrap();
    } catch (error) {
      console.error("Failed to update brand:", error);
    }
  };

  return (
    <Button className="bg-blue-500" disabled={isLoading} onClick={handleUpdate}>
      {isLoading ? "Updating..." : "Update"}
    </Button>
  );
};

export default EditBrandButton;
