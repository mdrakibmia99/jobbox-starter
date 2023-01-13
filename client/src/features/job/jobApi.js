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

    // apply new job
    applyJob: builder.mutation({
      query: (data) => ({
        url: "apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // fetch all jobs
    getJobs: builder.query({
      query: () => ({
        url: "jobs",
      }),
      providesTags: ["Jobs", "Job"],
    }),

    // fetch all applied jobs
    getAppliedJobs: builder.query({
      query: (email) => ({
        url: `applied-jobs/${email}`,
      }),
      providesTags: ["Jobs"],
    }),

    // fetch specific job
    getJob: builder.query({
      query: (id) => ({
        url: `job/${id}`,
      }),
      providesTags: ["Job"],
    }),

    // ask question
    question: builder.mutation({
      query: (data) => ({
        url: "query",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    // employer query
    employerQuery: builder.mutation({
      query: (data) => ({
        url: "employer-query",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    // reply question
    reply: builder.mutation({
      query: (data) => ({
        url: "reply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    // candidate reply
    candidateReply: builder.mutation({
      query: (data) => ({
        url: "candidate-reply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
