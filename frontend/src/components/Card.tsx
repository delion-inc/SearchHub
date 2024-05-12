import { Button } from "@/app/styles/ui/button";
import { Card as CardWrapper, CardDescription, CardFooter } from "@/app/styles/ui/card";
import { IRequest } from "@/types/request.interface";
import convertGender from "@/utils/convertGender";
import formatDate from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";

const Card = ({ ...request }: IRequest) => {
   const navigate = useNavigate();
   
   return (
      <CardWrapper className="bg-background"> 
            <CardDescription className="flex gap-x-5 p-5">
               <p>
                  <img className="max-w-[150px] object-cover" src={`data:image/webp;base64,${request.image}`} alt="Фото" />
               </p>
               <p>
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
               </p>
            </CardDescription> 
         <CardFooter className="flex items-center justify-between">
            <p className="text-muted-foreground">{formatDate(request.createdAt)}</p>
            <Button onClick={() => navigate(`/request/${request.id}`)}>Детальніше</Button>
         </CardFooter>
      </CardWrapper>
   );
};

export default Card;
