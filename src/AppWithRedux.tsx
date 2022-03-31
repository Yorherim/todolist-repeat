import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import "./App.scss";

import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { Todolist } from "./components/Todolist/Todolist";
import { AppRootStateType } from "./state/store";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterType,
    removeTodolistTC,
    todolistsActions,
    TodolistStateType,
} from "./state/todolists-reducer";

const AppWithRedux: React.FC = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistStateType[]>(
        (state) => state.todolists
    );

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [dispatch]);

    const changeFilter = useCallback(
        (newFilter: FilterType, todolistId: string) => {
            dispatch(todolistsActions.changeTodolistFilter(newFilter, todolistId));
        },
        [dispatch]
    );

    const removeTodolist = useCallback(
        (todolistId: string) => {
            dispatch(removeTodolistTC(todolistId));
        },
        [dispatch]
    );

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(addTodolistTC(title));
        },
        [dispatch]
    );

    const changeTodolistTitle = useCallback(
        (newTitle: string, todolistId: string) => {
            dispatch(changeTodolistTitleTC(newTitle, todolistId));
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
                                        changeTodolistTitle={changeTodolistTitle}
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
