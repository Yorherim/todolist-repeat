import Api from "../../api/api";
import { appActions } from "../app/app-reducer";
import { AppThunk } from "../store";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";

enum TypesAuthActions {
    SET_LOGGED_IN = "SET_LOGGED_IN",
}
export type AuthStateType = {
    isLoggedIn: boolean;
};
export type AuthData = {
    email: string;
    password: string;
    rememberMe?: boolean;
    captcha?: boolean;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AuthActionsTypes = ReturnType<InferValueTypes<typeof authActions>>;

const initialState: AuthStateType = {
    isLoggedIn: false,
};

export const authReducer = (
    state: AuthStateType = initialState,
    action: AuthActionsTypes
): AuthStateType => {
    switch (action.type) {
        case TypesAuthActions.SET_LOGGED_IN:
            return { ...state, isLoggedIn: action.value };
        default:
            return state;
    }
};

export const authActions = {
    setIsLoggedIn: (value: boolean) => ({
        type: TypesAuthActions.SET_LOGGED_IN as const,
        value,
    }),
};

// thunks
export const loginTC =
    (authData: AuthData): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(appActions.setLoadingStatus("loading"));
            const { data } = await Api.login(authData);
            if (data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn(true));
                dispatch(appActions.setLoadingStatus("succeeded"));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(appActions.setLoadingStatus("loading"));
        const { data } = await Api.logout();
        if (data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn(false));
            dispatch(appActions.setLoadingStatus("succeeded"));
        } else {
            handleServerAppError(data.messages, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
};
