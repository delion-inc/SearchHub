import { Button } from "@/app/styles/ui/button";
import { Card as CardWrapper, CardDescription, CardFooter } from "@/app/styles/ui/card";
import { IRequest } from "@/types/request.interface";
import convertGender from "@/utils/convertGender";
import formatDate from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";

const Card = ({ ...request }: IRequest) => {
   const navigate = useNavigate();
   
   return (
      <CardWrapper className="bg-background p-5"> 
            <CardDescription className="flex gap-x-5 sm:items-center max-sm:flex-col">
               <p>
                  <img className="max-w-[150px] object-cover max-sm:mb-5" src={`data:image/webp;base64,${request.image}`} alt="Фото" />
               </p>
               <p>
                  <p className="text-black text-2xl font-bold">{request.name}</p>
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
         <CardFooter className="flex items-center justify-between p-0 mt-5">
            <p className="text-muted-foreground">{formatDate(request.createdAt)}</p>
            <Button onClick={() => navigate(`/request/${request.id}`)}>Детальніше</Button>
         </CardFooter>
      </CardWrapper>
   );
};

export default Card;
