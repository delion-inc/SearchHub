import { Button } from "@/app/styles/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/styles/ui/dialog";
import { RequestFormData } from "@/types/request.interface";
import { AddRequestSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddRequestForm from "./AddRequestForm";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAddRequestMutation } from "@/api/endpoints/request.api";
import { ButtonLoading } from "./ButtonLoading";

const AddRequestDialog = ({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
   const form: UseFormReturn<RequestFormData> = useForm<RequestFormData>({
      resolver: zodResolver(AddRequestSchema),
      defaultValues: {
         name: "",
         description: "",
         city: "",
         gender: "M",
      },
   });

   const [addRequest, {isLoading}] = useAddRequestMutation();

   async function onSubmit(data: z.infer<typeof AddRequestSchema>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      try {
         await addRequest(data as RequestFormData).unwrap();
         toast("Оголошення успішно створено");
         setOpen(false);
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            toast("Сервер не відповідає( Спробуйте ще раз");
         } else if (err.originalStatus === 400) {
            toast("Будь ласка, заповніть всі поля");
         } else if (err.originalStatus === 401) {
            toast("Такий користувач вже зареєстрований");
         } else {
            toast("Виникла помилка( Спробуйте пізніше");
         }
      }
   }

   return (
      <DialogContent className="sm:max-w-[700px]">
         <DialogHeader>
            <DialogTitle>Додати оголошення</DialogTitle>
            <DialogDescription>Ви можете зробити оголошення про пошук людини.</DialogDescription>
         </DialogHeader>
         <AddRequestForm form={form} onSubmit={onSubmit} />
         <DialogFooter >
            {isLoading ? (
               <ButtonLoading />
            ) : (
               <Button form="request-form" type="submit" className="w-full">
                  Опублікувати
               </Button>
            )} 
         </DialogFooter>
      </DialogContent>
   );
};

export default AddRequestDialog;
