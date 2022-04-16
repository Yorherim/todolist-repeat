import Api from "../../api/api";
import { setIsLoggedIn } from "../auth/authReducer";
import { handleServerNetworkError } from "../../common/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppStateType = {
    status: RequestStatusType;
    error: string | null;
    initialized: boolean;
};
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionsTypes = ReturnType<InferValueTypes<typeof slice.actions>>;

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
    },
    extraReducers: (build) => {
        build.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.initialized = true;
        });
    },
});

export const appReducer = slice.reducer;
export const { setLoadingStatus, setError } = slice.actions;
