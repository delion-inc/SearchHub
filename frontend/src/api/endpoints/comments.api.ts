import api from "@/api/baseApi";

export const commentsSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      addComment: builder.mutation<void, { text: string, id: string }>({
         query: (comment) => (
            {
               url: "/api/v1/comment/add/" + comment.id,
               method: "POST",
               body: { text: comment.text },
            }
         ),
         invalidatesTags: ["Comments"],
      })
   }),
});

export const { useAddCommentMutation } = commentsSlice;
