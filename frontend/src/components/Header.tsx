import { selectCurrentToken, useAppSelector } from "@/app/redux";
import { Button } from "@/app/styles/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/styles/ui/dialog";
import { Input } from "@/app/styles/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
   const auth = useAppSelector(selectCurrentToken);

   return (
      <header className="bg-accent/50 backdrop-blur-sm fixed w-[100%]">
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
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button className="max-sm:px-3 max-sm:text-[13px] max-sm:py-2">Зробити оголошення</Button>
                           </DialogTrigger>
                           <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                 <DialogTitle>Edit profile</DialogTitle>
                                 <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    
                                    <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    
                                    <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                                 </div>
                              </div>
                              <DialogFooter>
                                 <Button type="submit">Save changes</Button>
                              </DialogFooter>
                           </DialogContent>
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
