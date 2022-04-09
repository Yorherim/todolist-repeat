import React, { useEffect } from "react";

import {
    LinearProgress,
    Box,
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import "./App.scss";

import { TodolistsListPage } from "../pages/TodolistsListPage";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";
import { initializeAppTC, RequestStatusType } from "../state/app/app-reducer";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { logoutTC } from "../state/auth/authReducer";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);

    const logout = () => dispatch(logoutTC());

    if (!isInitialized) {
        return (
            <Box sx={{ display: "flex" }} className={"circularProgress"}>
                <CircularProgress />
            </Box>
        );
    }
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

            <Routes>
                <Route path="/" element={<TodolistsListPage />} />
                <Route path="/auth" element={<LoginPage />} />
                <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
            </Routes>
        </>
    );
};

export default App;
