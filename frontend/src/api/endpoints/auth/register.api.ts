import { IAuthResponse, RegisterFormData } from "@/types/auth.interface";
import api from "@/api/baseApi";

export const registerSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation<IAuthResponse, Partial<RegisterFormData>>({
         query: (credentials) => ({
            url: "/api/v1/user/registration",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useRegisterMutation } = registerSlice;
