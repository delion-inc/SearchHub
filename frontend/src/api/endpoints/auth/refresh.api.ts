import api from "@/api/baseApi";
import { IAuthResponse } from "@/types/auth.interface";

export const refreshSlice = api.injectEndpoints({
   endpoints: (builder) => ({ 
      refresh: builder.mutation<IAuthResponse, void>({
         query: () => ({
            url: "/api/v1/user/refresh",
            method: "POST",
         }),
      }),
   }),
});

export const { useRefreshMutation } = refreshSlice;
