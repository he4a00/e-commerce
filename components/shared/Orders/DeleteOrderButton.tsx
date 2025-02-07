"use client";

import { useDeleteOrderMutation } from "@/app/store/slices/api/order/orderSlice";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DeleteOrderButton = ({ orderId }: { orderId: string }) => {
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation({});

  return (
    <Button
      className="bg-red-500"
      disabled={isLoading}
      onClick={() => deleteOrder(orderId)}
    >
      <Trash />
    </Button>
  );
};

export default DeleteOrderButton;
