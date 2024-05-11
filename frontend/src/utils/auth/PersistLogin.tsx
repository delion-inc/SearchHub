import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { setCredentials } from "@/app//redux/slices/authSlice";
import { useRefreshMutation } from "@/api/endpoints/auth/refresh.api";
import { useAppDispatch } from "@/app/redux/store";
import { selectCurrentToken } from "@/app/redux/selectors";
import { Loader2 } from "lucide-react";

const PersistLogin = () => {
   const [isLoading, setIsLoading] = useState(true);
   const token = useSelector(selectCurrentToken);
   const [persist] = useLocalStorage("persist", false);
   const [refresh] = useRefreshMutation();
   const dispatch = useAppDispatch();

   useEffect(() => {
      let isMounted = true;

      const verifyRefreshToken = async () => {
         try {
            const response = await refresh().unwrap();
            dispatch(
               setCredentials({
                  accessToken: response.accessToken,
                  roles: response.roles,
               })
            );
         } catch (error) {
            console.error(error);
            // navigate("/");
         } finally {
            isMounted && setIsLoading(false);
         }
      };

      !token && persist ? verifyRefreshToken() : setIsLoading(false);
      return () => {
         isMounted = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      // console.log(`isLoading: ${isLoading}`);
      // console.log(`aT: ${JSON.stringify(token)}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLoading]);
   return <>{!persist ? <Outlet /> : isLoading ? <Loader2 color="#176B87" className="absolute top-[45%] left-[49%] h-10 w-10 animate-spin" /> : <Outlet />}</>;
};

export default PersistLogin;
