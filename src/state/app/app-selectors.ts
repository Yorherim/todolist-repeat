import { AppRootStateType } from "../store";

export const getAppInitialized = (state: AppRootStateType) => state.app.initialized;
export const getAppError = (state: AppRootStateType) => state.app.error;
export const getAppLoadingStatus = (state: AppRootStateType) => state.app.loadingStatus;
