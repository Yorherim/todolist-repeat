import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Paper } from "@mui/material";

import { AddItemForm } from "../AddItemForm";
import Todolist from "../Todolist";
import {
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    todolistsActions,
    TodolistsDomainType,
} from "../../state/todolists-reducer";
import {
    addTaskTC,
    deleteTaskTC,
    TaskStateType,
    updateTaskTC,
} from "../../state/tasks-reducer";
import { AppRootStateType } from "../../state/store";
import { TaskStatuses } from "../../api/api";

export const TodolistList: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [dispatch]);

    const todolists = useSelector<AppRootStateType, Array<TodolistsDomainType>>(
        (state) => state.todolists
    );
    const tasks = useSelector<AppRootStateType, TaskStateType>(
        (state) => state.tasks
    );

    const changeTodoListFilter = useCallback(
        (filterValue: FilterValuesType, todolistId: string) => {
            dispatch(
                todolistsActions.changeTodolistFilter(filterValue, todolistId)
            );
        },
        [dispatch]
    );

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            dispatch(addTaskTC(todolistId, title));
        },
        [dispatch]
    );

    const removeTask = useCallback(
        (taskId: string, todolistId: string) => {
            dispatch(deleteTaskTC(todolistId, taskId));
        },
        [dispatch]
    );

    const changeCheckStatus = useCallback(
        (taskId: string, todolistId: string, taskStatus: TaskStatuses) => {
            dispatch(
                updateTaskTC(todolistId, taskId, {
                    status:
                        taskStatus === TaskStatuses.New
                            ? TaskStatuses.Completed
                            : TaskStatuses.New,
                })
            );
        },
        [dispatch]
    );

    const removeTodolist = useCallback(
        (todolistId: string) => {
            dispatch(deleteTodolistTC(todolistId));
        },
        [dispatch]
    );

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(createTodolistTC(title));
        },
        [dispatch]
    );

    const changeTaskTitle = useCallback(
        (taskId: string, todolistId: string, newTitle: string) => {
            dispatch(updateTaskTC(todolistId, taskId, { title: newTitle }));
        },
        [dispatch]
    );

    const changeTitleTodolist = useCallback(
        (todolistId: string, newTitle: string) => {
            dispatch(changeTodolistTitleTC(todolistId, newTitle));
        },
        [dispatch]
    );

    return (
        <>
            <Grid container>
                <Grid item style={{ padding: "20px 0px" }}>
                    <h2 style={{ paddingBottom: "15px" }}>Add new todolist</h2>
                    <AddItemForm
                        addItem={addTodolist}
                        placeholder="Add new todolist"
                        data-testid={"input-todolist"}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {todolists?.map((tl) => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{ padding: "10px" }} elevation={3}>
                                <Todolist
                                    todolistId={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    changeTodoListFilter={changeTodoListFilter}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeCheckStatus={changeCheckStatus}
                                    todoListFilter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTitleTodolist={changeTitleTodolist}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};