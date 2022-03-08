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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 } from "uuid";
import "./App.scss";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { Todolist } from "./components/Todolist/Todolist";
import { AppRootStateType } from "./state/store";

import {
    FilterType,
    todolistsActions,
    TodolistType,
} from "./state/todolists-reducer";

export const todolistId1 = v1();
export const todolistId2 = v1();

const AppWithRedux: React.FC = () => {
    console.log("rerender app");
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistType[]>(
        (state) => state.todolists
    );

    const changeFilter = (newFilter: FilterType, todolistId: string) => {
        dispatch(todolistsActions.changeTodolistFilter(newFilter, todolistId));
    };

    const removeTodolist = (todolistId: string) => {
        dispatch(todolistsActions.removeTodolist(todolistId));
    };

    const addTodolist = (title: string) => {
        dispatch(todolistsActions.addTodolist(title));
    };

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
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
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
