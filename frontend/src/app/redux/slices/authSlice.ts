import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
   roles: number[];
   accessToken: string | null;
}

const initialState: IInitialState = {
   roles: [],
   accessToken: null,
};

const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      setCredentials: (state, action) => {
         const { accessToken, roles } = action.payload;
         state.roles = roles;
         state.accessToken = accessToken;
      },
      logOut: (state) => {
         state.roles = [];
         state.accessToken = null;
      },
   },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer; 
