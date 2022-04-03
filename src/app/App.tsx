import React from "react";

import {
    LinearProgress,
    Box,
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import "./App.scss";

import { TodolistsList } from "../pages/TodolistsList";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";
import { RequestStatusType } from "../state/app-reducer";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";

const App: React.FC = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);

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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === "loading" && (
                    <Box sx={{ width: "100%" }} className={"linear-progress"}>
                        <LinearProgress color="inherit" />
                    </Box>
                )}
            </AppBar>
            <ErrorSnackbar />

            <TodolistsList />
        </>
    );
};

export default App;
