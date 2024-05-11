import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
   openLoginModal: boolean,
   openRegisterModal: boolean, 
   openRequestModal: boolean
}

const initialState: IInitialState = {
   openLoginModal: false,
   openRegisterModal: false, 
   openRequestModal: false, 
};

const modalSlice = createSlice({
   name: "modal",
   initialState: initialState,
   reducers: {
      toggleLoginModal: (state) => {
         state.openLoginModal = !state.openLoginModal;
      },
      toggleRegisterModal: (state) => {
         state.openRegisterModal = !state.openRegisterModal;
      }, 
      toggleRequestModal: (state) => {
         state.openRequestModal = !state.openRequestModal;
      }
   }
})

export const { toggleLoginModal, toggleRegisterModal, toggleRequestModal } = modalSlice.actions;
export default modalSlice.reducer;