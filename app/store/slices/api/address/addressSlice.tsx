import { baseQueryWithReauth } from "@/lib/baseApi";
import { Add_Address } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const addressSlice = createApi({
  reducerPath: "address",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (formData: Add_Address) => ({
        url: "AddressDelivery/addAddressDelivery",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Address"],
    }),

    getAddressByUser: builder.query({
      query: () => ({
        url: "AddressDelivery/getAddressDeliveryByUser",
        method: "GET",
      }),
      providesTags: ["Address"],
    }),

    deleteAddress: builder.mutation({
      query: (addressId: string) => ({
        url: `AddressDelivery/deleteAddressDelivery/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),

    // updateBrand: builder.mutation({
    //   query: (brand: { brandID: string; newBrandName: string }) => ({
    //     url: `Brand/updateBrand`,
    //     method: "PUT",
    //     body: {
    //       brandID: brand.brandID,
    //       brandName: brand.newBrandName,
    //     },
    //   }),
    //   invalidatesTags: ["Brands"],
    // }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressByUserQuery,
  useDeleteAddressMutation,
} = addressSlice;
