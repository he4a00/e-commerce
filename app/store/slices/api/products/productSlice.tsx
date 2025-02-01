import { baseQueryWithReauth } from "@/lib/baseApi";
import { Create_Product } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "product",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products", "Wishlist"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product: Create_Product) => ({
        url: "Product/addProduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProducts: builder.query({
      query: ({
        PageIndex,
        PageSize,
        SortBy,
        SortDirection,
      }: {
        PageIndex: number;
        PageSize: number;
        SortBy: string;
        SortDirection: string;
      }) => ({
        url: "Product/getAllProducts",
        params: { PageIndex, PageSize, SortBy, SortDirection },
      }),
      providesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `Product/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    searchProductByName: builder.query({
      query: (name: string) => ({
        url: `Product/searchProduct/${name}`,
      }),
      providesTags: ["Products"],
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `Product/getTopProducts`,
      }),
      providesTags: ["Products"],
    }),

    editProduct: builder.mutation({
      query: ({
        ProductID,
        ProductFiles,
        ProductName,
        ProductDescription,
        ProductPrice,
        Discount,
        StockQuantity,
        WarrantyPeriod,
        Color,
        ModelNumber,
        BrandID,
        CategoryID,
      }) => {
        const formData = new FormData();
        if (ProductFiles) {
          ProductFiles.forEach((file: File) => {
            formData.append("ProductFiles", file);
          });
        }
        formData.append("ProductID", ProductID);
        formData.append("ProductName", ProductName);
        formData.append("ProductDescription", ProductDescription);
        formData.append("ProductPrice", ProductPrice.toString());
        formData.append("Discount", Discount.toString());
        formData.append("StockQuantity", StockQuantity.toString());
        formData.append("ModelNumber", ModelNumber.toString());
        formData.append("BrandID", BrandID);
        formData.append("CategoryID", CategoryID);
        if (WarrantyPeriod) {
          formData.append("WarrantyPeriod", WarrantyPeriod.toString());
        }
        if (Color) {
          formData.append("Color", Color);
        }

        return {
          url: "Product/updateProduct",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id: string) => ({
        url: `Product/getProduct/${id}`,
      }),
      providesTags: ["Products", "Wishlist"],
    }),
    getProductsByParentCategory: builder.query({
      query: (parentID: string) => ({
        url: `Product/getProductsByParentCategory/${parentID}`,
      }),
      providesTags: ["Products"],
    }),
    getProductsByCategory: builder.query({
      query: (categoryID: string) => ({
        url: `Product/getProductsByCategory/${categoryID}`,
      }),
      providesTags: ["Products"],
    }),

    getProductsByPriceRange: builder.query({
      query: ({ Min, Max }: { Min: number; Max: number }) => ({
        url: "Product/getProductsByPriceRange",
        params: { Min, Max },
      }),
      providesTags: ["Products"],
    }),
    getProductsByBrand: builder.query({
      query: (name: string) => ({
        url: `Product/getProductsByBrandName/${name}`,
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useSearchProductByNameQuery,
  useGetTopProductsQuery,
  useEditProductMutation,
  useGetProductByIdQuery,
  useGetProductsByParentCategoryQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByPriceRangeQuery,
  useGetProductsByBrandQuery,
} = productSlice;
