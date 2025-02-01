import { baseQueryWithReauth } from "@/lib/baseApi";
import { Add_Delivery_Method } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const deliverySlice = createApi({
  reducerPath: "delivery",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Delivery"],
  endpoints: (builder) => ({
    addDeliveryMethod: builder.mutation({
      query: (formData: Add_Delivery_Method) => ({
        url: "DeliveryMethod/addDeliveryMethod",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Delivery"],
    }),

    getAllDeliveryMethods: builder.query({
      query: () => "DeliveryMethod/getAllDeliveryMethods",
      providesTags: ["Delivery"],
    }),

    deleteDeliveryMethod: builder.mutation({
      query: (id: string) => ({
        url: `DeliveryMethod/deleteDeliveryMethod/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Delivery"],
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
  useAddDeliveryMethodMutation,
  useGetAllDeliveryMethodsQuery,
  useDeleteDeliveryMethodMutation,
} = deliverySlice;
