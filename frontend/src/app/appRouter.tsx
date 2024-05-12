import { Route, Routes } from "react-router-dom";
import Layout from "@/app/appLayout";
import Home from "@/pages/Home";
import PersistLogin from "@/utils/auth/PersistLogin";
import Hero from "@/components/Hero";
import RequireAuth from "@/utils/auth/RequireAuth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Request from "@/pages/Request";

enum Role {
   User = 2001, 
}

const AppRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            {/* Public routes */} 
               <Route path="welcome" element={<Hero />} /> 
               <Route path="login" element={<Login />} /> 
               <Route path="registration" element={<Register />} /> 
            <Route element={<PersistLogin />}>
               {/* Protected routes */}
               <Route element={<RequireAuth allowedRoles={[Role.User]} />}>
                  <Route path="/" element={<Home />} />
               </Route> 
               <Route element={<RequireAuth allowedRoles={[Role.User]} />}>
                  <Route path="/request:id" element={<Request />} />
               </Route> 
            </Route>

            {/* Missing page */}
            {/* <Route path="*" element={<Missing />} /> */}
         </Route>
      </Routes>
   );
};

export default AppRouter;
