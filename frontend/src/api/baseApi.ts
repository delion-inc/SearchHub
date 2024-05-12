import { createApi  } from "@reduxjs/toolkit/query/react"; 
import { baseQueryWithReAuth } from "@/api/baseQuery"; 

const api = createApi({
   baseQuery: baseQueryWithReAuth,
   endpoints: () => ({}),
   tagTypes: ["Request", "Comments"],
});

export default api;