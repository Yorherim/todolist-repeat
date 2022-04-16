import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import Api, { AuthData } from "../../api/api";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";
import { setLoadingStatus } from "../app/app-reducer";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AuthActionsTypes = ReturnType<InferValueTypes<typeof authSlice.actions>>;

export const loginTC = createAsyncThunk("auth/login", async (authData: AuthData, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus({ status: "loading" }));
    try {
        const { data } = await Api.login(authData);
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setLoadingStatus({ status: "succeeded" }));
        } else {
            handleServerAppError(data.messages, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
    }
});

export const logoutTC = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus({ status: "loading" }));
    try {
        const { data } = await Api.logout();
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setLoadingStatus({ status: "succeeded" }));
        } else {
            handleServerAppError(data.messages, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = true;
        });
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        });
    },
});

export const authReducer = authSlice.reducer;
export const { setIsLoggedIn } = authSlice.actions;
