import { baseQueryWithReauth } from "@/lib/baseApi";
import { Add_Order } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
  reducerPath: "order",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData: Add_Order) => ({
        url: "Order/addOrder",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrdersByUser: builder.query({
      query: () => "Order/getOrdersByUser",
      providesTags: ["Orders"],
    }),

    getAllOrders: builder.query({
      query: () => "Order/getOrders",
      providesTags: ["Orders"],
    }),

    deleteOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `Order/deleteOrder/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrdersByUserQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} = orderSlice;
