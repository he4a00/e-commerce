import { useState } from "react";
import { usePlaceOrderMutation, useGetAddressByUserQuery } from "../services/api";
import DeliveryChoose from "../components/shared/Checkout/DeliveryChoose";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState("delivery");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string>("");
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const { data: userAddresses } = useGetAddressByUserQuery({});

  const handleDeliveryMethodSelect = (methodId: string) => {
    setSelectedDeliveryMethod(methodId);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      addressID: userAddresses?.[0]?.addressID,
      deliveryMethodID: selectedDeliveryMethod,
      orderItems: [{ productID: "123", quantity: 1, price: 100 }],
    };
    const result = await placeOrder(orderData);
    console.log(result);
  };

  return (
    <CardContent>
      {currentStep === "delivery" && (
        <DeliveryChoose onDeliveryMethodSelect={handleDeliveryMethodSelect} />
      )}
    </CardContent>
  );
}