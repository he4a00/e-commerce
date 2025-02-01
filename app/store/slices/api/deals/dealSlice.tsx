import { baseQueryWithReauth } from "@/lib/baseApi";
import { Deal } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dealSlice = createApi({
  reducerPath: "deal",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Deals"],
  endpoints: (builder) => ({
    addDeal: builder.mutation({
      query: (formData: Deal) => ({
        url: "Deal/addDeal",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Deals"],
    }),
    getAllDeals: builder.query({
      query: () => "Deal/getAllDeals",
      providesTags: ["Deals"],
    }),
    deleteDeal: builder.mutation({
      query: (id: string) => ({
        url: `Deal/deleteDeal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deals"],
    }),
    getAllActiveDeals: builder.query({
      query: () => "Deal/getAllDealsActive",
      providesTags: ["Deals"],
    }),
  }),
});

export const {
  useAddDealMutation,
  useGetAllDealsQuery,
  useDeleteDealMutation,
  useGetAllActiveDealsQuery,
} = dealSlice;
