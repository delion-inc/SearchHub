import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import api from "@/api/baseApi";
import authReducer from "@/app/redux/slices/authSlice";
import modalReducer from "@/app/redux/slices/modalSlice"

export const store = configureStore({
   reducer: {
      [api.reducerPath]: api.reducer,
      auth: authReducer,
      modal: modalReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
