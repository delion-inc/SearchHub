import api from "@/api/baseApi";
import { RequestFormData } from "@/types/request.interface";

export const requestSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      addRequest: builder.mutation<void, RequestFormData>({
         query: (credentials) => ({
            url: "/api/v1/request/add",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useAddRequestMutation } = requestSlice;
