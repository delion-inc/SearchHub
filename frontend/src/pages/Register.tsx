import { Button } from "@/app/styles/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { RegisterFormData } from "@/types/auth.interface";
import { RegisterSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useRegisterMutation } from "@/api";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials, useAppDispatch } from "@/app/redux";
import RegistrationForm from "@/components/RegistrationForm";
import { ButtonLoading } from "@/components/ButtonLoading";

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
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   async function onSubmit(data: z.infer<typeof RegisterSchema>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...dataToSend } = data;
      try {
         const userData = await register(dataToSend as Partial<RegisterFormData>).unwrap();
         toast("Реєстрація виконана успішно"); 
         dispatch(setCredentials({ ...userData }));
         navigate("/"); 
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
      <div className="m-auto py-[100px]">
         <Card className="bg-custom max-w-2xl m-auto mt-5">
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
         <Toaster />
      </div>
   );
};

export default Register;
