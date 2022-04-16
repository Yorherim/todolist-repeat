import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppBar, Toolbar, Typography, Button, Box, LinearProgress } from "@mui/material";

import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { getAppLoadingStatus } from "../state/app/app-selectors";
import { getAuthIsLoggedIn } from "../state/auth/auth-selectors";
import { useActions } from "../hooks/useActions";
import { authActions } from "../state/auth";

export const HeaderLayout: React.FC = () => {
    const { logoutTC } = useActions(authActions);
    const status = useSelector(getAppLoadingStatus);
    const isLoggedIn = useSelector(getAuthIsLoggedIn);

    return (
        <>
            <AppBar position="static" className="app-bar">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo App
                    </Typography>
                    {isLoggedIn && (
                        <Button color="inherit" onClick={() => logoutTC}>
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
