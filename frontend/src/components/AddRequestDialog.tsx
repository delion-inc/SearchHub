import { Button } from "@/app/styles/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/styles/ui/dialog";
import { RequestFormData } from "@/types/request.interface";
import { AddRequestSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddRequestForm from "./AddRequestForm";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { useAddRequestMutation } from "@/api/endpoints/request.api";
import { ButtonLoading } from "./ButtonLoading";
// import { selectImage, useAppSelector } from "@/app/redux";
import useImageToBlob from "@/hooks/useImageToBlob";
import useImageUpload from "@/hooks/useImageUpload";
import { Label } from "@/app/styles/ui/label";
import { Input } from "@/app/styles/ui/input";

const AddRequestDialog = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
   // const selectedImage = useAppSelector(selectImage);
   const { selectedFile, onSelectFile } = useImageUpload();

   const { blob } = useImageToBlob(selectedFile);

   const form: UseFormReturn<RequestFormData> = useForm<RequestFormData>({
      resolver: zodResolver(AddRequestSchema),
      defaultValues: {
         name: "",
         description: "",
         location: "",
         gender: "M",
      },
   });

   const [addRequest, { isLoading }] = useAddRequestMutation();

   async function onSubmit(data: z.infer<typeof AddRequestSchema>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const requestData = { image: blob, ...data };
      console.log(requestData.image);
      try {
         await addRequest(requestData as RequestFormData).unwrap();
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
         <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Фото</Label>
            <Input id="picture" type="file" accept="image/*" onChange={onSelectFile} />
         </div>
         <AddRequestForm form={form} onSubmit={onSubmit} />
         <DialogFooter>
            {isLoading ? (
               <ButtonLoading />
            ) : (
               <Button form="request-form" type="submit" className="w-full">
                  Опублікувати
               </Button>
            )}
         </DialogFooter>
         <Toaster />
      </DialogContent>
   );
};

export default AddRequestDialog;
