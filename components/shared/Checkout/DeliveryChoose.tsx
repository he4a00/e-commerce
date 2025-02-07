"use client";

import { useGetAllDeliveryMethodsQuery } from "@/app/store/slices/api/delivery/deliverySlice";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Add_Delivery_Method } from "@/types";

interface DeliveryChooseProps {
  onDeliveryMethodSelect: (methodId: string) => void;
  selectedDeliveryMethod: string;
}

const DeliveryChoose = ({ onDeliveryMethodSelect, selectedDeliveryMethod }: DeliveryChooseProps) => {
  const { data: deliveryMethods } = useGetAllDeliveryMethodsQuery({});

  const handleDeliveryMethodChange = (value: string) => {
    onDeliveryMethodSelect(value);
  };

  return (
    <RadioGroup
      defaultValue="standard"
      className="grid gap-4"
      value={selectedDeliveryMethod}
      onValueChange={handleDeliveryMethodChange}
    >
      {deliveryMethods?.result.map((method: Add_Delivery_Method) => (
        <div
          key={method.deliveryMethodID}
          className="flex items-center space-x-4 rounded-lg border p-4"
        >
          <RadioGroupItem
            value={method.deliveryMethodID || ""}
            id={method.deliveryMethodID}
          />
          <Label
            htmlFor={method.deliveryMethodID}
            className="flex flex-1 items-center justify-between"
          >
            <div>
              <div className="font-medium">{method.shortName}</div>
              <div className="text-sm text-slate-500">{method.description}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">
                {method.price === 0 ? "Free" : `$${method.price.toFixed(2)}`}
              </div>
              <div className="text-sm text-slate-500">
                {method.deliveryTime}
              </div>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default DeliveryChoose;
