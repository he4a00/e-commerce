import { baseQueryWithReauth } from "@/lib/baseApi";
import { Add_TO_Cart } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const cartSlice = createApi({
  reducerPath: "cart",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart", "Products"],
  endpoints: (builder) => ({
    addProductToCart: builder.mutation({
      query: (cartData: Add_TO_Cart) => ({
        url: `cart/add`,
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart", "Products"],
    }),
    getUserCart: builder.query({
      query: () => "cart/",
      providesTags: ["Cart"],
    }),
    removeProductFromCart: builder.mutation({
      query: (productID: string) => ({
        url: `cart/remove/${productID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "cart/clear",
        method: "DELETE"
      }),
      invalidatesTags: ["Cart"],
    })
  }),
});

export const {
  useGetUserCartQuery,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
  useClearCartMutation
} = cartSlice;
