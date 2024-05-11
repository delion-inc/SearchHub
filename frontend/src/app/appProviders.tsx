import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import { store } from "@/app/redux"; 

interface ProvidersProps {
   children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <Routes>
               {children}
            </Routes>
         </BrowserRouter>
      </Provider>
   );
};

export default Providers;
