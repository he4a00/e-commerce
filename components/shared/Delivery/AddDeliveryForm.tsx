"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { DeliveryValidation } from "@/lib/validations/Delivery";
import { useAddDeliveryMethodMutation } from "@/app/store/slices/api/delivery/deliverySlice";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const AddDeliveryForm = () => {
  const form = useForm({
    resolver: zodResolver(DeliveryValidation),
    defaultValues: {
      shortName: "",
      price: 0,
      deliveryTime: "",
      description: "",
    },
  });

  const [addDeliveryMethod, { isLoading, isSuccess }] =
    useAddDeliveryMethodMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      redirect("/admin/delivery");
      form.reset();
    }
  }, [isSuccess, form, toast]);

  function onSubmit(values: z.infer<typeof DeliveryValidation>) {
    addDeliveryMethod(values);
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border">
      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="shortName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  Delivery Method Name
                </FormLabel>
                <FormControl className="w-full">
                  <Input {...field} placeholder="Express" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  Extra Price
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="20 EGP"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryTime"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  Delivery Time
                </FormLabel>
                <FormControl className="w-full">
                  <Input {...field} placeholder="3 DAYS" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  Delivery Method Description
                </FormLabel>
                <FormControl className="w-full">
                  <Input {...field} placeholder="Delivery in 3 days" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col gap-5">
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isLoading}
            >
              Add Delivery Method
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <Link
              className="text-center font-semibold text-xl text-blue-600 hover:underline"
              href="/admin"
            >
              <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
                Dashboard
              </button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddDeliveryForm;
