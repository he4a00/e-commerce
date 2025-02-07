/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Truck, MapPin, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeliveryChoose from "@/components/shared/Checkout/DeliveryChoose";
import Address from "@/components/shared/Checkout/Address";
import Payment from "@/components/shared/Checkout/Payment";
import { usePlaceOrderMutation } from "@/app/store/slices/api/order/orderSlice";
import { useGetAddressByUserQuery } from "@/app/store/slices/api/address/addressSlice";
import { useGetUserCartQuery } from "@/app/store/slices/api/cart/cartSlice";
import { toast } from "@/hooks/use-toast";

const steps = [
  {
    id: "delivery",
    name: "Delivery",
    icon: Truck,
  },
  {
    id: "address",
    name: "Address",
    icon: MapPin,
  },
  {
    id: "payment",
    name: "Payment",
    icon: CreditCard,
  },
];

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState("delivery");
  const [placeOrder, { isSuccess: isOrderSuccess, isLoading }] = usePlaceOrderMutation();
  const { data: userAddresses } = useGetAddressByUserQuery({});
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>("");

  const { data: orderItems } = useGetUserCartQuery({});

  console.log(userAddresses);

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleDeliveryMethodSelect = (methodId: string) => {
    setSelectedDeliveryMethod(methodId);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      addressID: userAddresses?.result?.[0]?.addressID,
      deliveryMethodID: selectedDeliveryMethod,
      orderItems: orderItems?.cartItems?.map((item: any) => {
        return {
          productID: item.productID,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    };
    await placeOrder(orderData);

    if (isOrderSuccess) {
      toast({
        title: "Order placed successfully",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${
                      currentStep === step.id
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : index < steps.findIndex((s) => s.id === currentStep)
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                >
                  {index < steps.findIndex((s) => s.id === currentStep) ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-1 ${
                      index < steps.findIndex((s) => s.id === currentStep)
                        ? "bg-emerald-500"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {steps.find((step) => step.id === currentStep)?.name}
            </CardTitle>
            <CardDescription>
              {currentStep === "delivery" && "Choose your delivery method"}
              {currentStep === "address" && "Enter your delivery address"}
              {currentStep === "payment" && "Enter your payment details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === "delivery" && (
              <DeliveryChoose
                onDeliveryMethodSelect={handleDeliveryMethodSelect}
              />
            )}

            {currentStep === "address" && <Address />}

            {currentStep === "payment" && <Payment />}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === "delivery"}
              >
                Back
              </Button>
              <Button
                onClick={
                  currentStep === "payment" ? handlePlaceOrder : handleNext
                }
                className="bg-emerald-500 hover:bg-emerald-600"
                disabled={isLoading}
              >
                {currentStep === "payment" ? "Place Order" : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
