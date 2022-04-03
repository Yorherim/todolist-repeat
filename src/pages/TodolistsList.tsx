import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Grid, Paper } from "@mui/material";

import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import { Todolist } from "../components/Todolist/Todolist";
import { AppRootStateType } from "../state/store";
import {
    TodolistStateType,
    fetchTodolistsTC,
    FilterType,
    todolistsActions,
    removeTodolistTC,
    addTodolistTC,
    changeTodolistTitleTC,
} from "../state/todolists/todolists-reducer";

export const TodolistsList: React.FC = () => {
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
                                        entityStatus={td.entityStatus}
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
