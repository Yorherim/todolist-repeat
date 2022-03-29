import { Menu } from "@mui/icons-material";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container,
    Grid,
    Paper,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 } from "uuid";
import Api from "./api/api";
import "./App.scss";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { Todolist } from "./components/Todolist/Todolist";
import { AppRootStateType } from "./state/store";

import { FilterType, todolistsActions, TodolistStateType } from "./state/todolists-reducer";

export const todolistId1 = v1();
export const todolistId2 = v1();

const AppWithRedux: React.FC = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistStateType[]>(
        (state) => state.todolists
    );

    useEffect(() => {
        (async function () {
            const data = await Api.getTodolists();
            console.log(data);
        })();
    }, []);

    const changeFilter = useCallback(
        (newFilter: FilterType, todolistId: string) => {
            dispatch(todolistsActions.changeTodolistFilter(newFilter, todolistId));
        },
        [dispatch]
    );

    const removeTodolist = useCallback(
        (todolistId: string) => {
            dispatch(todolistsActions.removeTodolist(todolistId));
        },
        [dispatch]
    );

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(todolistsActions.addTodolist(title));
        },
        [dispatch]
    );

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
            </AppBar>

            <Container fixed>
                <AddItemForm addItem={addTodolist} className="input-todolist" />

                <Grid container spacing={5}>
                    {todolists.map((td) => {
                        return (
                            <Grid item key={td.id}>
                                <Paper className="paper">
                                    <Todolist
                                        title={td.title}
                                        filter={td.filter}
                                        todolistId={td.id}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};

export default AppWithRedux;
