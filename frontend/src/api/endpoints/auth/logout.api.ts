import api from "@/api/baseApi";

export const logoutSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      logout: builder.mutation<void, void>({
         query: () => ({
            url: "/api/user/logout",
            method: "POST",
         }),
      }),
   }),
});

export const { useLogoutMutation } = logoutSlice;
