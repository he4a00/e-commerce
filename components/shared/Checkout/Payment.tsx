import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Payment = () => {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input id="expiryDate" placeholder="MM/YY" />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" />
        </div>
      </div>
    </div>
  );
};

export default Payment;
