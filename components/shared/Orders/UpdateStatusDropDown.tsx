/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUpdateOrderStatusMutation } from "@/app/store/slices/api/order/orderSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/constants";

const UpdateStatusDropDown = ({
  orderStatus,
  orderID,
}: {
  orderStatus: string;
  orderID: string;
}) => {
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();
  return (
    <Select 
      onValueChange={(value) => updateStatus({ orderStatus: value, orderID })}
      disabled={isLoading}
    >
      <SelectTrigger className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <SelectValue placeholder={orderStatus} />
        {isLoading && <span className="ml-2">Updating...</span>}
      </SelectTrigger>
      <SelectContent>
        {OrderStatus.map((status: any) => (
          <SelectItem key={status.status} value={status.number}>
            {status.status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UpdateStatusDropDown;
