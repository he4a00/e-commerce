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
import { Add_Delivery_Method } from "@/types";
import Loader from "../Loader";
import { useGetAllDeliveryMethodsQuery } from "@/app/store/slices/api/delivery/deliverySlice";
import DeleteDeliveryButton from "./DeleteDeliveryButton";

export function DeliveryTable() {
  const { data: allDeliveryMethods, isLoading } = useGetAllDeliveryMethodsQuery(
    {}
  );

  console.log(allDeliveryMethods);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table>
      <TableCaption>A list of your recent brands.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Delivery name</TableHead>
          <TableHead>Delivery Time</TableHead>
          <TableHead>Delivery Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allDeliveryMethods?.result?.map((delivery: Add_Delivery_Method) => (
          <TableRow key={delivery.deliveryMethodID}>
            <TableCell className="font-medium">{delivery.shortName}</TableCell>
            <TableCell className="font-medium">
              {delivery.deliveryTime}
            </TableCell>
            <TableCell className="font-medium">{delivery.price}</TableCell>
            <TableCell className="text-right">
              <div className="m-2 flex gap-3 justify-end items-center">
                <DeleteDeliveryButton id={delivery.deliveryMethodID || ""} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
