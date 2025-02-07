/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  Package2Icon,
  SearchIcon,
} from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useGetOrdersByUserQuery } from "@/app/store/slices/api/order/orderSlice";

// Types for our order data
interface Order {
  orderID: string;
  orderDate: string;
  orderItems: {
    orderItemID: string;
    price: number;
    productImage: string;
    productName: string;
    quantity: number;
  }[];
  orderNumber: string;
  orderStatus: string;
  totalPrice: number;
}

// Status badge styling helper
const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-yellow-100 text-yellow-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const { data: userOrders } = useGetOrdersByUserQuery({});

  const orders = userOrders?.result;

  console.log(orders);

  // Filter orders based on search query and status
  const filteredOrders = orders?.filter((order: Order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderItems.some((item: any) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(order.orderStatus);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-2">
            View and track your order history
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-96">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Filter by Status
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {(
                ["processing", "shipped", "delivered", "cancelled"] as string[]
              ).map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={(checked) => {
                    setStatusFilter(
                      checked
                        ? [...statusFilter, status]
                        : statusFilter.filter((s) => s !== status)
                    );
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-4">
          {filteredOrders?.map((order: Order) => (
            <Card key={order.orderID}>
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {order.orderNumber}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {format(new Date(order.orderDate), "MMMM d, yyyy")}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(order.orderStatus)}
                  >
                    {order.orderStatus.charAt(0).toUpperCase() +
                      order.orderStatus.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.orderItemID}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.productImage || "/placeholder.svg"}
                            alt={item.productName}
                            className="h-16 w-16 rounded-md object-cover"
                            width={100}
                            height={100}
                          />
                          <div>
                            <p className="font-medium">{item.productName}</p>

                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                      {order.orderItems[order.orderItems.length - 1]
                        .orderItemID !== item.orderItemID && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-4">
                    <Label>Total</Label>
                    <p className="text-lg font-bold">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredOrders?.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Package2Icon className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-center text-muted-foreground">
                  {searchQuery || statusFilter.length > 0
                    ? "No orders match your search criteria"
                    : "No orders found"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
