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
import { DealValidation } from "@/lib/validations/Deal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddDealMutation } from "@/app/store/slices/api/deals/dealSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const AddDealForm = () => {
  const { id: paramProductID } = useParams();
  const productID = typeof paramProductID === "string" ? paramProductID : "";

  const form = useForm({
    resolver: zodResolver(DealValidation),
    defaultValues: {
      discount: 0,
      startDate: new Date(),
      endDate: new Date(),
      productID: productID,
    },
  });

  const [addDeal, { isLoading, isSuccess }] = useAddDealMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Deal created successfully",
      });
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof DealValidation>) {
    addDeal(values);
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border">
      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  Discount
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter The Deal Discount"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-5">
                <FormLabel className="font-semibold text-gray-700">
                  Start Date
                </FormLabel>
                <FormControl className="w-full">
                  <div className="flex-center w-full overflow-hidden h-[52px] rounded-full bg-gray-50 px-4 py-2 ">
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-5">
                <FormLabel className="font-semibold text-gray-700">
                  End Date
                </FormLabel>
                <FormControl className="w-full">
                  <div className="flex-center w-full overflow-hidden h-[52px] rounded-full bg-gray-50 px-4 py-2 ">
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
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
              Add Deal
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

export default AddDealForm;
