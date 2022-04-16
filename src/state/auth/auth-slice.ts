import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loginTC, logoutTC } from "./auth-actions";

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
