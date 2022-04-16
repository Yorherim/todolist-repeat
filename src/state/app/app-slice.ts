import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initializeAppTC } from "./app-actions";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppStateType = {
    loadingStatus: RequestStatusType;
    error: string | null;
    initialized: boolean;
};

export const appSlice = createSlice({
    name: "app",
    initialState: {
        loadingStatus: "idle",
        error: null,
        initialized: false,
    } as AppStateType,
    reducers: {
        setLoadingStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.loadingStatus = action.payload.status;
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

export const appReducer = appSlice.reducer;
export const { setLoadingStatus, setError } = appSlice.actions;
