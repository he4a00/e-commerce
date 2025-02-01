"use client";

import { useDeleteDealMutation } from "@/app/store/slices/api/deals/dealSlice";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DeleteDealButton = ({ id }: { id: string }) => {
  const [deleteDeal, { isLoading }] = useDeleteDealMutation({});

  return (
    <Button
      className="bg-red-500"
      disabled={isLoading}
      onClick={() => deleteDeal(id)}
    >
      <Trash />
    </Button>
  );
};

export default DeleteDealButton;
