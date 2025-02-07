/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseQueryWithReauth } from "@/lib/baseApi";
import { User } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user: User) => ({
        url: "Account/register-Client",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "Account/login",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted({ email, password }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", data.token);
        } catch (error) {
          console.error("Login Error:", error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "Account/revokeToken",
        method: "POST",
        body: { token: localStorage.getItem("token") },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        } catch (error) {
          console.error("Logout Error:", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userSlice;
