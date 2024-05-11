import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "@/app/appProviders";
import "@/app/styles/index.css";
import AppRouter from "@/app/appRouter";
import { Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <Providers>
         <Route path='/*' element={<AppRouter />}></Route>
      </Providers>
   </React.StrictMode>
);
