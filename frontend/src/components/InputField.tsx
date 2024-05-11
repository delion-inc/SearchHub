/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/styles/ui/form";
import { Input } from "@/app/styles/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
   control: Control<T>;
   name: Path<T>;
   label: string;
   type: string;
   placeholder: string;
};

const InputField = <T extends FieldValues>({ control, name, label, type, placeholder }: InputFieldProps<T>) => (
   <FormField
      control={control}
      name={name}
      render={({ field }) => (
         <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
               <Input className="transition" value={field.value} onChange={field.onChange} type={type} placeholder={placeholder}></Input>
            </FormControl>
            <FormMessage />
         </FormItem>
      )}
   ></FormField>
);

export default InputField;
