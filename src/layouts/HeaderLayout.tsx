import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Box,
    LinearProgress,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
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
