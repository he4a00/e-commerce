import { baseQueryWithReauth } from "@/lib/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const voteSlice = createApi({
  reducerPath: "votes",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Votes", "Reviews"],
  endpoints: (builder) => ({
    upVote: builder.mutation({
      query: (reviewID: string) => ({
        url: `Vote/upVote`,
        method: "POST",
        body: { reviewID },
      }),
      invalidatesTags: ["Votes", "Reviews"],
     
    }),
    downVote: builder.mutation({
      query: (reviewID: string) => ({
        url: `Vote/downVote`,
        method: "POST",
        body: { reviewID },
      }),
      invalidatesTags: ["Votes", "Reviews"],
    }),
  }),
});

export const { useDownVoteMutation, useUpVoteMutation } = voteSlice;
