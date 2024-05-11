import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { LoginFormData } from "@/types/auth.interface";
import InputField from "@/components/InputField";
import useToggle from "@/hooks/useToggle";
import { Form } from "@/app/styles/ui/form";
import { Checkbox } from "@/app/styles/ui/checkbox";

type LoginFormProps = {
   form: UseFormReturn<LoginFormData>;
   onSubmit: SubmitHandler<LoginFormData>;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, onSubmit }) => {
   const [check, toggleCheck] = useToggle("persist", false);

   return (
      <Form {...form}>
         <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
               <div className="flex flex-col space-y-1.5">
                  <div>
                     <InputField<LoginFormData>
                        control={form.control}
                        name="email"
                        label="Email"
                        type="text"
                        placeholder="Введіть адресу електронної пошти"
                     />
                  </div>
                  <div>
                     <InputField<LoginFormData>
                        control={form.control}
                        name="password"
                        label="Пароль"
                        type="password"
                        placeholder="Введіть пароль для входу в акаунт"
                     />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                     <Checkbox id="keepLoggedIn" onCheckedChange={toggleCheck} checked={check} />
                     <label htmlFor="keepLoggedIn" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Запам'ятати мене
                     </label>
                  </div>
               </div>
            </div>
         </form>
      </Form>
   );
};

export default LoginForm;
