import Api from "../../api/api";
import { authActions } from "../auth/authReducer";
import { AppThunk } from "../store";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";

enum TypesAppActions {
    SET_STATUS = "SET_STATUS",
    SET_ERROR = "SET_ERROR",
    SET_INITIALIZED = "SET_INITIALIZED",
}
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppStateType = {
    status: RequestStatusType;
    error: string | null;
    initialized: boolean;
};
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionsTypes = ReturnType<InferValueTypes<typeof appActions>>;

const initialState: AppStateType = {
    status: "idle",
    error: null,
    initialized: false,
};

export const appReducer = (
    state: AppStateType = initialState,
    action: AppActionsTypes
): AppStateType => {
    switch (action.type) {
        case TypesAppActions.SET_STATUS:
            return { ...state, status: action.status };
        case TypesAppActions.SET_ERROR:
            return { ...state, error: action.error };
        case TypesAppActions.SET_INITIALIZED:
            return { ...state, initialized: action.value };
        default:
            return state;
    }
};

export const appActions = {
    setLoadingStatus: (status: RequestStatusType) => ({
        type: TypesAppActions.SET_STATUS as const,
        status,
    }),
    setError: (error: string | null) => ({
        type: TypesAppActions.SET_ERROR as const,
        error,
    }),
    setInitialized: (value: boolean) => ({
        type: TypesAppActions.SET_INITIALIZED as const,
        value,
    }),
};

export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try {
        const { data } = await Api.authMe();
        if (data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn(true));
        }
        dispatch(appActions.setInitialized(true));
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
};
