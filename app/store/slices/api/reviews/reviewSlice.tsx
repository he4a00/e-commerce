import { baseQueryWithReauth } from "@/lib/baseApi";
import { Add_Review } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const reviewSlice = createApi({
  reducerPath: "reviews",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ ProductID, ReviewText, Rating }: Add_Review) => {
        const formData = new FormData();
        formData.append("ProductID", ProductID as string);
        formData.append("ReviewText", ReviewText as string);
        formData.append("Rating", Rating.toString());

        return {
          url: "Review/addReview",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getAllProductReviews: builder.query({
      query: ({
        productID,
        PageIndex,
        PageSize,
      }: {
        productID: string;
        PageIndex: number;
        PageSize: number;
      }) => ({
        url: `Review/getAllReviews/${productID}`,
        params: {
          PageIndex,
          PageSize,
        },
      }),
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useAddReviewMutation, useGetAllProductReviewsQuery } =
  reviewSlice;
