import { createAsyncThunk } from "@reduxjs/toolkit";
import Api, { AuthData } from "../../api/api";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { setLoadingStatus } from "../app/app-slice";

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
