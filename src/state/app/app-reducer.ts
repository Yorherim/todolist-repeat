import Api from "../../api/api";
import { setIsLoggedIn } from "../auth/authReducer";
import { AppThunk } from "../store";
import { handleServerNetworkError } from "../../common/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppStateType = {
    status: RequestStatusType;
    error: string | null;
    initialized: boolean;
};
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionsTypes = ReturnType<InferValueTypes<typeof slice.actions>>;

const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle",
        error: null,
        initialized: false,
    } as AppStateType,
    reducers: {
        setLoadingStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setInitialized(state, action: PayloadAction<{ value: boolean }>) {
            state.initialized = action.payload.value;
        },
    },
});

export const appReducer = slice.reducer;
export const { setLoadingStatus, setError, setInitialized } = slice.actions;

export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try {
        const { data } = await Api.authMe();
        if (data.resultCode === 0) {
            dispatch(setIsLoggedIn({ value: true }));
        }
        dispatch(setInitialized({ value: true }));
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
};
