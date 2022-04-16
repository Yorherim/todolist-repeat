import { createAsyncThunk } from "@reduxjs/toolkit";

import Api from "../../api/api";
import { handleServerNetworkError } from "../../utils/error-utils";
import { setIsLoggedIn } from "../auth/auth-slice";

export const initializeAppTC = createAsyncThunk(
    "app/initializeApp",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await Api.authMe();
            if (data.resultCode === 0) {
                dispatch(setIsLoggedIn({ value: true }));
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);
