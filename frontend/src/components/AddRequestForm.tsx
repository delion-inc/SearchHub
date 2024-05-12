import { SubmitHandler, UseFormReturn } from "react-hook-form";
import InputField from "@/components/InputField";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/styles/ui/form";
import { RequestFormData } from "@/types/request.interface";
import { Textarea } from "@/app/styles/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/styles/ui/select";

type RegisterFormProps = {
   form: UseFormReturn<RequestFormData>;
   onSubmit: SubmitHandler<RequestFormData>;
};

const AddRequestForm: React.FC<RegisterFormProps> = ({ form, onSubmit }) => { 

   return (
      <Form {...form}>
         <form id="request-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
               <div className="flex flex-col space-y-1.5">
                  
                  <div>
                     <InputField<RequestFormData> control={form.control} name="name" label="Ім'я та прізвище" type="text" placeholder="Введіть ім'я та прізвище" />
                  </div>
                  <div>
                     <InputField<RequestFormData>
                        control={form.control}
                        name="location"
                        label="Місто"
                        type="string"
                        placeholder="Орієнтовне місто в якому зникла людина"
                     />
                  </div>
                  <div>
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Опис</FormLabel>
                              <FormControl>
                                 <Textarea
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="transition max-h-[200px]"
                                    placeholder="Опис зниклої людини"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     ></FormField>
                  </div>
                  <div>
                     <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Стать</FormLabel>
                              <Select onValueChange={field.onChange}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Оберіть стать зниклої людини." />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="M">Чоловік</SelectItem>
                                    <SelectItem value="W">Жінка</SelectItem>
                                    <SelectItem value="O">Інше</SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
            </div>
         </form>
      </Form>
   );
};

export default AddRequestForm;
