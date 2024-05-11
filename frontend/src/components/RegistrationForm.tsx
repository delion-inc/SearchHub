/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "@/types/auth.interface";
import InputField from "@/components/InputField";
import { FC } from "react";
import { Form } from "@/app/styles/ui/form";

type RegistrationFormProps = {
   form: UseFormReturn<RegisterFormData>;
   onSubmit: SubmitHandler<RegisterFormData>;
};

const RegistrationForm: FC<RegistrationFormProps> = ({ form, onSubmit }) => (
   <Form {...form}>
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
         <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
               <div className="flex justify-between items-center gap-x-3">
                  <div className="w-full">
                     <InputField<RegisterFormData> control={form.control} name="name" label="Ім'я" type="text" placeholder="Введіть ваше ім'я" />
                  </div>
                  <div className="w-full">
                     <InputField<RegisterFormData>
                        control={form.control}
                        name="surname"
                        label="Прізвище"
                        type="text"
                        placeholder="Введіть ваше прізвище"
                     />
                  </div>
               </div>
               <div>
                  <InputField<RegisterFormData>
                     control={form.control}
                     name="email"
                     label="Email"
                     type="text"
                     placeholder="Введіть адресу електронної пошти"
                  />
               </div>
               <div>
                  <InputField<RegisterFormData>
                     control={form.control}
                     name="phone"
                     label="Номер телефону"
                     type="text"
                     placeholder="Введіть Ваш номер мобільного телефону (0XX-XXX-XX-XX)"
                  />
               </div>
               <div>
                  <InputField<RegisterFormData>
                     control={form.control}
                     name="password"
                     label="Пароль"
                     type="password"
                     placeholder="Введіть пароль для входу в акаунт"
                  />
               </div>
               <div>
                  <InputField<RegisterFormData>
                     control={form.control}
                     name="confirmPassword"
                     label="Підтвердити пароль"
                     type="password"
                     placeholder="Введіть пароль"
                  />
               </div> 
            </div>
         </div>
      </form>
   </Form>
);

export default RegistrationForm;
