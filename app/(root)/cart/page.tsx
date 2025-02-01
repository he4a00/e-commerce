"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useGetUserCartQuery } from "@/app/store/slices/api/cart/cartSlice";
import RemoveFromCart from "@/components/shared/Home/RemoveFromCart";
import ClearCart from "@/components/shared/Home/ClearCartButton";
import Link from "next/link";

interface CartProduct {
  productID: string;
  productName: string;
  price: number;
  pictureUrl: string;
  brandName: number;
  quantity: number;
}

export default function Cart() {
  const { data: cartProducts } = useGetUserCartQuery({});

  console.log(cartProducts);

  const subtotal = cartProducts?.cartItems?.reduce(
    (acc: number, product: { price: number; quantity: number }) =>
      acc + product.price * product.quantity,
    0
  );
  const shipping = "Free";
  const total = subtotal;

  if (cartProducts?.cartItems?.length == 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-slate-600 mb-6">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>
        <Button className="bg-emerald-500 hover:bg-emerald-600" asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Your Cart</h1>
          <p className="text-slate-600">
            There are{" "}
            <span className="text-emerald-500 font-medium">
              {cartProducts?.cartItems?.length}
            </span>{" "}
            products in your cart
          </p>
        </div>
        <ClearCart />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-[auto,2fr,1fr,1fr,auto] gap-4 mb-4 px-4">
              <div>
                <Checkbox />
              </div>
              <div className="font-medium">Product</div>
              <div className="font-medium">Unit Price</div>
              <div className="font-medium">Quantity</div>
              <div className="font-medium">Remove</div>
            </div>

            {cartProducts?.cartItems?.map((product: CartProduct) => (
              <div
                key={product.productID}
                className="bg-white rounded-lg p-4 mb-4"
              >
                <div className="grid grid-cols-[auto,2fr,1fr,1fr,auto] gap-4 items-center">
                  <div>
                    <Checkbox />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-white rounded-lg border p-2">
                      <Image
                        src={product.pictureUrl || "/placeholder.svg"}
                        alt={product.productName}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">
                        {product.productName}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-slate-500 ml-1">
                          ({product.brandName})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-emerald-500 font-medium">
                    ${product.price?.toFixed(2)}
                  </div>
                  <div>
                    <span>{product.quantity}</span>
                  </div>
                  <RemoveFromCart productID={product.productID} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-emerald-500 font-medium">
                  ${subtotal?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="text-emerald-500 font-medium">{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Estimate for</span>
                <span className="text-slate-800">United Kingdom</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="text-slate-600">Total</span>
                  <span className="text-emerald-500 font-medium">
                    ${total?.toFixed(2)}
                  </span>
                </div>
                <Link href="/checkout">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Proceed To Checkout
                </Button>

                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
