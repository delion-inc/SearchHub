import { Card, CardDescription, CardFooter, CardHeader } from "@/app/styles/ui/card";
import convertGender from "@/utils/convertGender";
import formatDate from "@/utils/formatDate";
import { useParams } from "react-router-dom";

const Request = ({...request}) => {
   const {id} = useParams();
   console.log(id);

   return (
      <Card className="bg-background">
         <CardHeader>
            <CardDescription className="flex gap-x-5">
               <div>
                  <img className="max-w-[150px] object-cover" src={`data:image/webp;base64,${request.image}`} alt="Фото" />
               </div>
               <div>
                  <h1 className="text-black text-2xl font-bold">{request.name}</h1>
                  <br />
                  <p className="mb-5">{request.description}</p>
                  {request.info && (
                     <p className="text-muted-foreground">
                        <span className="font-bold">Знайдено в: </span>
                        <a href={request.info}>{request.info}</a>
                     </p>
                  )}
                  <p className="text-muted-foreground">
                     <span className="font-bold">Автор: </span>
                     {request.user.name} {request.user.surname} <br />
                  </p>
                  <p className="text-muted-foreground">
                     <span className="font-bold">Локація: </span>
                     {request.location} <br />
                  </p>
                  <p className="text-muted-foreground">
                     <span className="font-bold">Стать: </span>
                     {convertGender(request.gender)} <br />
                  </p>
                  <p className="text-muted-foreground">{formatDate(request.createdAt)}</p>
               </div>
            </CardDescription>
         </CardHeader>
         <CardFooter className="flex items-center justify-between">
            
           
         </CardFooter>
      </Card>
   );
};

export default Request;
