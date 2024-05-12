import { useAddCommentMutation } from "@/api/endpoints/comments.api";
import { useGetRequestQuery } from "@/api/endpoints/request.api";
import { Button } from "@/app/styles/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/app/styles/ui/card";
import { Input } from "@/app/styles/ui/input";
import Comment from "@/components/Comment";
import convertGender from "@/utils/convertGender";
import formatDate from "@/utils/formatDate";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Request = () => {
   const { id } = useParams();
   const [comment, setComment] = useState(""); 
   const { data, isLoading } = useGetRequestQuery(Number(id));
   const [addComment] = useAddCommentMutation();

   async function onSubmit() {
      try {
         await addComment({text: comment, id: id ?? ""}).unwrap(); 
         window.location.reload();
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         console.log(err);
      }
   }

   return (
      <section className="m-auto py-[120px] max-w-2xl">
         {isLoading ? (
            <div className="mt-[90px] max-w-[750px] mx-auto space-y-10">
               <p className="mt-[200px] text-center text-background">Завантаження...</p>
            </div>
         ) : (
            <Card className="bg-background">
               <CardHeader>
                  <CardDescription className="flex gap-x-5 sm:items-center max-sm:flex-col">
                     <div>
                        <img className="max-w-[150px] object-cover max-sm:mb-5" src={`data:image/webp;base64,${data?.image}`} alt="Фото" />
                     </div>
                     <div>
                        <h1 className="text-black text-2xl font-bold">{data?.name}</h1>
                        <br />
                        <p className="mb-5">{data?.description}</p>
                        {data?.info && (
                           <p className="text-muted-foreground">
                              <span className="font-bold">Знайдено в: </span>
                              <a href={data?.info}>{data?.info}</a>
                           </p>
                        )} 
                        <p className="text-muted-foreground">
                           <span className="font-bold">Локація: </span>
                           {data?.location} <br />
                        </p>
                        <p className="text-muted-foreground">
                           <span className="font-bold">Стать: </span>
                           {convertGender(data?.gender ?? "O")} <br />
                        </p>
                        <p className="text-muted-foreground">
                           <span className="font-bold">Автор: </span>
                           {data?.user.name} {data?.user.surname} <br />
                        </p>
                        <p className="text-muted-foreground">
                           <span className="font-bold">Телефон: </span>
                            {data?.user.phone} <br />
                        </p>
                        <p className="text-muted-foreground">
                           <span className="font-bold">Email: </span>
                            {data?.user.email} <br />
                        </p>
                        <p className="text-muted-foreground mt-2">{formatDate(data?.createdAt ?? "")}</p>
                     </div>
                  </CardDescription>
               </CardHeader>
               <CardFooter className="grid">
                  <form className="flex w-full"> 
                     <Input onChange={(e) => setComment(e.target.value)} value={comment} className="flex-grow" placeholder="Написати коментар" />
                     <Button onClick={onSubmit} type='button'>Опублікувати</Button>
                  </form>
                  <div className="flex flex-col-reverse gap-y-5 mt-5">
                     {data?.comments.map((comment) => (
                        <Comment key={comment.id} {...comment} />
                     ))}
                  </div>
               </CardFooter>
            </Card>
         )}
      </section>
   );
};

export default Request;
