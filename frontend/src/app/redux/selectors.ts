import { RootState } from "@/app/redux";

export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
