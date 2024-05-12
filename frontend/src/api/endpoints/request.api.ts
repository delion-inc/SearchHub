import api from "@/api/baseApi";
import { IRequest, RequestFormData } from "@/types/request.interface";

export const requestSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      addRequest: builder.mutation<void, RequestFormData>({
         query: (request) => {
            const formData = new FormData(); 
            formData.append('name', request.name);
            formData.append('description', request.description);
            formData.append('gender', request.gender);
            formData.append('image', request.image || '');
            formData.append('location', request.location); 
            
            return {
               url: "/api/v1/request/add",
               method: "POST",
               body: formData,
            }
         }, 
         invalidatesTags: ["Request"],
      }),
      getAllRequests: builder.query<IRequest[], void>({
         query: () => "/api/v1/request/get-all",
         providesTags: ['Request'],
      }),
      getRequest: builder.query<IRequest, number>({
         query: (id) => `/api/v1/request/get/${id}`,
         providesTags: ['Request'],
      }),
   }),
});

export const { useAddRequestMutation, useGetAllRequestsQuery, useGetRequestQuery } = requestSlice;
