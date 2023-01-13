import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // post new job
    postJob: builder.mutation({
      query: (data) => ({
        url: "job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
