"use client";

import { useDeleteDeliveryMethodMutation } from "@/app/store/slices/api/delivery/deliverySlice";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DeleteDeliveryButton = ({ id }: { id: string }) => {
  const [deleteDeliveryMethod, { isLoading }] = useDeleteDeliveryMethodMutation({});

  return (
    <Button
      className="bg-red-500"
      disabled={isLoading}
      onClick={() => deleteDeliveryMethod(id)}
    >
      <Trash />
    </Button>
  );
};

export default DeleteDeliveryButton;
