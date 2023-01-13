import apiSlice from "../api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register an user
    register: builder.mutation({
      query: (data) => ({
        url: "user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(getUser(data.email));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    
    // fetch user by email
    fetchUserByEmail: builder.query({
      query: (email) => ({
        method: "GET",
        url: `user/${email}`,
      }),
      invalidatesTags: ["User"],
    }),

    // fetch all user
    fetchAllUser: builder.query({
      query: () => ({
        method: "GET",
        url: "users",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useFetchUserByEmailQuery,
  useFetchAllUserQuery,
} = authApi;
