import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
    Box,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import "./App.scss";

import { AddItemForm } from "../AddItemForm";
import Todolist from "../Todolist";
import {
    fetchTodolistsTC,
    FilterValuesType,
    todolistsActions,
    TodolistsDomainType,
} from "../../state/todolists-reducer";
import {
    addTaskTC,
    deleteTaskTC,
    tasksActions,
    TaskStateType,
} from "../../state/tasks-reducer";
import { AppStateType } from "../../state/store";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppStateType, Array<TodolistsDomainType>>(
        (state) => state.todolists
    );
    const tasks = useSelector<AppStateType, TaskStateType>(
        (state) => state.tasks
    );

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [dispatch]);

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
        (taskId: string, todolistId: string) => {
            dispatch(tasksActions.changeCheckStatus(taskId, todolistId));
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

    const changeTaskTitle = useCallback(
        (taskId: string, todolistId: string, newTitle: string) => {
            dispatch(
                tasksActions.changeTaskTitle(taskId, todolistId, newTitle)
            );
        },
        [dispatch]
    );

    const changeTitleTodolist = useCallback(
        (todolistId: string, newTitle: string) => {
            dispatch(
                todolistsActions.changeTodolistTitle(todolistId, newTitle)
            );
        },
        [dispatch]
    );

    return (
        <div className="App">
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
                </AppBar>
            </Box>

            <Container fixed>
                <Grid container>
                    <Grid item style={{ padding: "20px 0px" }}>
                        <h2 style={{ paddingBottom: "15px" }}>
                            Add new todolist
                        </h2>
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
                                <Paper
                                    style={{ padding: "10px" }}
                                    elevation={3}
                                >
                                    <Todolist
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        changeTodoListFilter={
                                            changeTodoListFilter
                                        }
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeCheckStatus={changeCheckStatus}
                                        todoListFilter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTitleTodolist={
                                            changeTitleTodolist
                                        }
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
};

export default App;
