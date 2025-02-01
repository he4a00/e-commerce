import { baseQueryWithReauth } from "@/lib/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categorySlice = createApi({
  reducerPath: "category",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ParentCategories", "Categories"],
  endpoints: (builder) => ({
    createCateogry: builder.mutation({
      query: (formData) => ({
        url: "Category/addCategory",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Categories", "ParentCategories"],
    }),
    getAllCategories: builder.query({
      query: () => "Category/getCategories",
      providesTags: ["Categories"],
    }),
    getParentCategories: builder.query({
      query: () => "Category/getCategoriesParent",
      providesTags: ["ParentCategories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `Category/deleteCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories", "ParentCategories"],
    }),

    editCategory: builder.mutation({
      query: ({
        CategoryID,
        newCategoryName,
        newCategoryImage,
        newParentCategoryID,
      }) => {
        const formData = new FormData();
        formData.append("CategoryID", CategoryID);
        formData.append("CategoryName", newCategoryName);
        formData.append("CategoryImage", newCategoryImage);
        formData.append("ParentCategoryID", newParentCategoryID);

        return {
          url: "Category/UpdateCategory",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Categories", "ParentCategories"],
    }),

    getAllSubCategories: builder.query({
      query: () => "Category/getAllSubCategories",
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCateogryMutation,
  useGetParentCategoriesQuery,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetAllSubCategoriesQuery,
} = categorySlice;
