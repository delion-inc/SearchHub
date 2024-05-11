import { selectCurrentToken, useAppSelector } from "@/app/redux";
import { Button } from "@/app/styles/ui/button";
import { Dialog, DialogTrigger } from "@/app/styles/ui/dialog";
import { Link } from "react-router-dom";
import AddRequestDialog from "./AddRequestDialog";
import { useState } from "react";

const Header = () => {
   const auth = useAppSelector(selectCurrentToken);
   const [open, setOpen] = useState(false);

   return (
      <header className="bg-custom/50 backdrop-blur-sm fixed w-[100%]">
         <div className="flex justify-between items-center gap-x-3 container py-3 max-sm:px-2">
            <div> 
               <img className="w-[90px] max-sm:w-[60px]" src="/logo.png" alt="SearchHub" />
            </div>
            <nav>
               <ul className="flex sm:gap-x-6 gap-x-3 items-center">
                  {!auth ? (
                     <>
                        <li>
                           <Button className="max-sm:px-3 max-sm:text-[13px] max-sm:py-2" asChild>
                              <Link to="/registration">Зареєструватись</Link>
                           </Button>
                        </li>
                        <li>
                           <Button className="max-sm:px-3 max-sm:text-[13px] max-sm:py-2" asChild>
                              <Link to="/login">Увійти</Link>
                           </Button>
                        </li>
                     </>
                  ) : (
                     <li>
                        <Dialog open={open} onOpenChange={setOpen}>
                           <DialogTrigger asChild>
                              <Button className="max-sm:px-3 max-sm:text-[13px] max-sm:py-2">Зробити оголошення</Button>
                           </DialogTrigger> 
                           <AddRequestDialog setOpen={setOpen}/>
                        </Dialog>
                     </li>
                  )}
               </ul>
            </nav>
         </div>
      </header>
   );
};

export default Header;
