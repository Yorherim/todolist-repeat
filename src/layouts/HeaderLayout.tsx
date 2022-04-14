import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppBar, Toolbar, Typography, Button, Box, LinearProgress } from "@mui/material";

import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { AppRootStateType } from "../state/store";
import { RequestStatusType } from "../state/app/app-reducer";
import { logoutTC } from "../state/auth/authReducer";

export const HeaderLayout: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);

    const logout = () => dispatch(logoutTC());

    return (
        <>
            <AppBar position="static" className="app-bar">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo App
                    </Typography>
                    {isLoggedIn && (
                        <Button color="inherit" onClick={logout}>
                            Log out
                        </Button>
                    )}
                </Toolbar>
                {status === "loading" && (
                    <Box sx={{ width: "100%" }} className={"linear-progress"}>
                        <LinearProgress color="inherit" />
                    </Box>
                )}
            </AppBar>
            <ErrorSnackbar />

            <Outlet />
        </>
    );
};
