import { useGetRequestQuery } from "@/api/endpoints/request.api";
import { Card, CardDescription, CardFooter, CardHeader } from "@/app/styles/ui/card";
import convertGender from "@/utils/convertGender";
import formatDate from "@/utils/formatDate";
import { useParams } from "react-router-dom";

const Request = () => {
   const { id } = useParams();

   const { data, isLoading } = useGetRequestQuery(Number(id)); 

   return (
      <>
         {isLoading ? (
            <div className="mt-[90px] max-w-[750px] mx-auto space-y-10">
               <p className="mt-[200px] text-center text-background">Завантаження...</p>
            </div>
         ) : (
            <Card className="bg-background">
               <CardHeader>
                  <CardDescription className="flex gap-x-5">
                     <div>
                        <img className="max-w-[150px] object-cover" src={`data:image/webp;base64,${data?.image}`} alt="Фото" />
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
                           <span className="font-bold">Автор: </span>
                           {data?.user.name} {data?.user.surname} <br />
                        </p>
                        <p className="text-muted-foreground">
                           <span className="font-bold">Локація: </span>
                           {data?.location} <br />
                        </p>
                        <p className="text-muted-foreground">
                           <span className="font-bold">Стать: </span>
                           {convertGender(data?.gender ?? "O")} <br />
                        </p>
                        <p className="text-muted-foreground">{formatDate(data?.createdAt ?? "")}</p>
                     </div>
                  </CardDescription>
               </CardHeader>
               <CardFooter className="flex items-center justify-between"></CardFooter>
            </Card>
         )}
      </>
   );
};

export default Request;
