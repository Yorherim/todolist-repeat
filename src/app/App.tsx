import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import "./App.scss";

import { TodolistsListPage } from "../pages/TodolistsListPage";
import { AppRootStateType } from "../state/store";
import { initializeAppTC } from "../state/app/app-reducer";
import { LoginPage } from "../pages/LoginPage";
import { HeaderLayout } from "../layouts/HeaderLayout";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized);

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <Box sx={{ display: "flex" }} className={"circularProgress"}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <>
            <Routes>
                <Route path="/" element={<HeaderLayout />}>
                    <Route index element={<TodolistsListPage />} />
                    <Route path="auth" element={<LoginPage />} />
                    <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
