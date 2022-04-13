import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Api, { AuthData } from "../../api/api";

import { AppThunk } from "../store";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";
import { setLoadingStatus } from "../app/app-reducer";

export type AuthInitialStateType = {
    isLoggedIn: boolean;
};
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AuthActionsTypes = ReturnType<InferValueTypes<typeof slice.actions>>;

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    } as AuthInitialStateType,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
    },
});

export const authReducer = slice.reducer;
export const { setIsLoggedIn } = slice.actions;

// thunks
export const loginTC =
    (authData: AuthData): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            const { data } = await Api.login(authData);
            if (data.resultCode === 0) {
                dispatch(setIsLoggedIn({ value: true }));
                dispatch(setLoadingStatus({ status: "succeeded" }));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setLoadingStatus({ status: "loading" }));
        const { data } = await Api.logout();
        if (data.resultCode === 0) {
            dispatch(setIsLoggedIn({ value: false }));
            dispatch(setLoadingStatus({ status: "succeeded" }));
        } else {
            handleServerAppError(data.messages, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
};
