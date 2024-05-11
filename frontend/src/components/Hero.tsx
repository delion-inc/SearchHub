import { Button } from "@/app/styles/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
   return (
      <> 
         <div>welcome</div>
         <Button asChild><Link to="/register">Зареєструватись</Link></Button>
         <Button><Link to="/login">Увійти</Link></Button>
      </>
   );
};

export default Hero;
