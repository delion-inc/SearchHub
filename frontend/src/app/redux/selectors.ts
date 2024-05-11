import { RootState } from "@/app/redux";

export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectOpenLogin = (state: RootState) => state.modal.openLoginModal;
export const selectOpenRegister = (state: RootState) => state.modal.openRegisterModal;
export const selectOpenRequest = (state: RootState) => state.modal.openRequestModal;