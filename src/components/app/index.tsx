import React from "react";
import { useSelector } from "react-redux";

import { Menu } from "@mui/icons-material";
import {
    AppBar,
    LinearProgress,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";

import "./App.scss";

import { TodolistList } from "../TodolistList";
import { ErrorSnackbar } from "../assets/ErrorSnackbar";
import { AppRootStateType } from "../../state/store";
import { RequestStatusType } from "../../state/app-reducer";

const App: React.FC = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    );

    return (
        <div className="App">
            <ErrorSnackbar />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
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
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === "loading" && (
                        <Box sx={{ width: "100%" }}>
                            <LinearProgress
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    top: 64,
                                }}
                            />
                        </Box>
                    )}
                </AppBar>
            </Box>

            <Container fixed>
                <TodolistList />
            </Container>
        </div>
    );
};

export default App;
