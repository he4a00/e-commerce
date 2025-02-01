import { useAddReviewMutation } from "@/app/store/slices/api/reviews/reviewSlice";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ReviewValidation } from "@/lib/validations/Review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from "react";

const AddReviewForm = ({ ProductID }: { ProductID: string }) => {
  const [addReview, { isLoading, isSuccess }] = useAddReviewMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ReviewValidation>>({
    resolver: zodResolver(ReviewValidation),
    defaultValues: {
      ReviewText: "",
      Rating: 5,
      ProductID: ProductID,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Review added successfully",
        description: "Your review has been added to the product",
      });
      form.reset();
    }
  }, [isSuccess, toast, form]);

  function onSubmit(values: z.infer<typeof ReviewValidation>) {
    addReview(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="Rating"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue="5"
                  value={field.value.toString()}
                  onValueChange={(value) => {
                    field.onChange(parseInt(value));
                  }}
                  className="flex gap-4"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={value.toString()}
                        id={`rating-${value}`}
                        className="peer sr-only"
                      />
                      <FormLabel
                        htmlFor={`rating-${value}`}
                        className="flex items-center justify-center w-12 h-12 text-sm border rounded-full peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary hover:border-primary/50 cursor-pointer transition-colors"
                      >
                        {value}
                      </FormLabel>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ReviewText"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your review..."
                  className="min-h-[100px] focus-visible:ring-primary"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full sm:w-auto bg-green-500 mt-6"
          disabled={isLoading}
        >
          Submit Review
        </Button>
      </form>
    </Form>
  );
};

export default AddReviewForm;
