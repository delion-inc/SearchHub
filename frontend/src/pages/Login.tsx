import { Button } from "@/app/styles/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { LoginFormData } from "@/types/auth.interface";
import { LoginSchema  } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useLoginMutation } from "@/api";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials, useAppDispatch } from "@/app/redux";
import { ButtonLoading } from "@/components/ButtonLoading";
import LoginForm from "@/components/LoginForm";

const Login = () => {
   const form: UseFormReturn<LoginFormData> = useForm<LoginFormData>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const [login, {isLoading}] = useLoginMutation();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   async function onSubmit(data: z.infer<typeof LoginSchema>) {
      try {
         // const userData = await login(data).unwrap();
         const userData = {accessToken: "1", roles: [2001]}
         dispatch(setCredentials({ ...userData }));
         navigate("/");
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            toast("Сервер не відповідає( Спробуйте ще раз");
         } else if (err.originalStatus === 400) {
            toast("Будь ласка, заповніть всі поля");
         } else if (err.originalStatus === 401) {
            toast("Неправильний логін або пароль");
         } else {
            toast("Виникла помилка( Спробуйте пізніше");
         }
      }
   }

   return (
      <div className="m-auto py-[100px]">
         <Card className="bg-custom max-w-2xl m-auto sm:mt-20 mt-10">
            <CardHeader>
               <CardTitle>Вхід</CardTitle>
               <CardDescription>Увійдіть на сайт, щоб мати змогу переглядати оголошення про зниклих безвісти та робити запити.</CardDescription>
            </CardHeader>
            <CardContent> 
               <LoginForm form={form} onSubmit={onSubmit} />
            </CardContent>
            <CardFooter className="grid">
               {isLoading ? (
                  <ButtonLoading />
               ) : (
                  <Button form="register-form" type="submit" className="w-full">
                     Увійти
                  </Button>
               )}
               <Button 
                  asChild
                  variant="link"
                  className="mx-auto" 
               >
                  <Link to="/registration">Зареєструватись</Link>
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
};

export default Login;
