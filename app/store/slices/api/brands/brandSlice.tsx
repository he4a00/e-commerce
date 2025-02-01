import { baseQueryWithReauth } from "@/lib/baseApi";
import { Brand } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const brandSlice = createApi({
  reducerPath: "brand",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Brands"],
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (brandName: Brand) => ({
        url: "Brand/addBrand",
        method: "POST",
        body: brandName,
      }),
      invalidatesTags: ["Brands"],
    }),

    getAllBrands: builder.query({
      query: () => "Brand/getAllBrands",
      providesTags: ["Brands"],
    }),

    deleteBrand: builder.mutation({
      query: (brandId: string) => ({
        url: `Brand/deleteBrand/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),

    updateBrand: builder.mutation({
      query: (brand: { brandID: string; newBrandName: string }) => ({
        url: `Brand/updateBrand`,
        method: "PUT",
        body: {
          brandID: brand.brandID,
          brandName: brand.newBrandName,
        },
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brandSlice;
