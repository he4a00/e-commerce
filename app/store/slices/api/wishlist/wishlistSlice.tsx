import { baseQueryWithReauth } from "@/lib/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const wishlistSlice = createApi({
  reducerPath: "wishlist",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Wishlist", "Products"],
  endpoints: (builder) => ({
    addProductToWishlist: builder.mutation({
      query: (productID: string) => ({
        url: `Wishlist/addProductToWishlist/`,
        method: "POST",
        body: { productID: productID },
      }),
      invalidatesTags: ["Wishlist", "Products"],
    }),
    getUserWishlist: builder.query({
      query: () => "Wishlist/getWishlist/",
      providesTags: ["Wishlist"],
    }),
    removeProductFromWishlist: builder.mutation({
      query: (productID: string) => ({
        url: `Wishlist/removeProductFromWishlist/${productID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useAddProductToWishlistMutation,
  useGetUserWishlistQuery,
  useRemoveProductFromWishlistMutation,
} = wishlistSlice;
