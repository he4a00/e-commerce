"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Order } from "@/types";
import Loader from "../Loader";
import { useGetAllOrdersQuery } from "@/app/store/slices/api/order/orderSlice";
import DeleteOrderButton from "./DeleteOrderButton";

export function OrderTable() {
  const { data: allOrders, isLoading } = useGetAllOrdersQuery({});

  console.log(allOrders?.result)

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table>
      <TableCaption>
        {allOrders?.result.length === 0
          ? "No orders found"
          : "A list of your recent orders."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order Number</TableHead>
          <TableHead>Items Number</TableHead>
          <TableHead>Order Staus</TableHead>
          <TableHead>Total Price</TableHead>

          <TableHead>Order Date</TableHead>
          <TableHead>User Email</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allOrders?.result?.map((order: Order) => (
          <TableRow key={order.orderID}>
            <TableCell className="font-medium">{order.orderNumber}</TableCell>
            <TableCell className="font-medium">{order.orderItems.length}</TableCell>
            <TableCell className="font-medium">{order.orderStatus}</TableCell>
            <TableCell className="font-medium">{order.totalPrice}</TableCell>
            <TableCell className="font-medium">
            {format(new Date(order.orderDate), "MMMM d, yyyy")}
            </TableCell>
            <TableCell className="font-medium">{order.userName}</TableCell>
            <TableCell className="text-right">
              <div className="m-2 flex gap-3 justify-end items-center">
                <DeleteOrderButton orderId={order.orderID || ""} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
