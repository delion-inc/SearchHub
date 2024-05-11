import { Button } from "@/app/styles/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { RegisterFormData } from "@/types/auth.interface";
import { RegisterSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import RegistrationForm from "./RegistrationForm";
import { useRegisterMutation } from "@/api";
import { z } from "zod";
import { toast } from "sonner";
import { ButtonLoading } from "./ButtonLoading";
import { Link } from "react-router-dom";

const Register = () => {
   const form: UseFormReturn<RegisterFormData> = useForm<RegisterFormData>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         name: "",
         surname: "",
         email: "",
         phone: "",
         password: "",
         confirmPassword: ""
      },
   });

   const [register, {isLoading}] = useRegisterMutation();
   // const dispatch = useAppDispatch();

   async function onSubmit(data: z.infer<typeof RegisterSchema>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...dataToSend } = data;
      try {
         await register(dataToSend as Partial<RegisterFormData>).unwrap();
         toast("Реєстрація виконана успішно"); 
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
      <div className="m-auto py-20">
         <Card className="bg-custom max-w-2xl m-auto">
            <CardHeader>
               <CardTitle>Реєстрація</CardTitle>
               <CardDescription>Зареєструйтесь на сайті, щоб мати змогу переглядати оголошення про зниклих безвісти та робити запити.</CardDescription>
            </CardHeader>
            <CardContent> 
               <RegistrationForm form={form} onSubmit={onSubmit} />
            </CardContent>
            <CardFooter className="grid">
               {isLoading ? (
                  <ButtonLoading />
               ) : (
                  <Button form="register-form" type="submit" className="w-full">
                     Зареєструватись
                  </Button>
               )}
               <Button 
                  asChild
                  variant="link"
                  className="mx-auto" 
               >
                  <Link to="/login">Увійти</Link>
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
};

export default Register;
