/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://ecommerce1234.runasp.net/api/",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const state = getState() as any;
    if (
      state?.currentRequest?.body &&
      !(state.currentRequest.body instanceof FormData)
    ) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log("Making request:", args);

  let result = await baseQuery(args, api, extraOptions);
  console.log("Request result:", result);

  if (result.error && result.error.status === 401) {
    console.log("Detected 401 error, attempting token refresh");

    let refreshResult;
    try {
      refreshResult = await baseQuery(
        {
          url: "Account/refreshtoken",
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        },
        api,
        extraOptions
      );
    } catch (err) {
      console.error("Error parsing refresh result:", err);
      return { error: { status: 400, data: "Failed to parse refresh result" } };
    }

    console.log("Refresh result:", refreshResult);

    if (refreshResult.data) {
      const { token } = refreshResult.data as any;
      console.log("Got new token:", token);

      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        user.token = token;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      }

      console.log("Retrying original request");
      result = await baseQuery(args, api, extraOptions);
      console.log("Retry result:", result);
    } else {
      console.log("Token refresh failed");
      //   localStorage.removeItem("user");
      //   localStorage.removeItem("token");
      //   window.location.href = "/sign-in";
    }
  }

  return result;
};
