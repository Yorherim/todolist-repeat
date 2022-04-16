import { AppRootStateType } from "../store";

export const getAuthIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
