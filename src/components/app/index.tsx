import React from "react";
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
    FilterValuesType,
    todolistsActions,
    TodolistsType,
} from "../../state/todolists-reducer";
import { tasksActions, TaskStateType } from "../../state/tasks-reducer";
import { AppStateType } from "../../state/store";

const App: React.FC = () => {
    console.log("app rerender");

    const dispatch = useDispatch();
    const todolists = useSelector<AppStateType, Array<TodolistsType>>(
        (state) => state.todolists
    );
    const tasks = useSelector<AppStateType, TaskStateType>(
        (state) => state.tasks
    );

    const changeTodoListFilter = (
        filterValue: FilterValuesType,
        todolistId: string
    ) => {
        dispatch(
            todolistsActions.changeTodolistFilter(filterValue, todolistId)
        );
    };

    const addTask = (title: string, todolistId: string) => {
        dispatch(tasksActions.addTask(title, todolistId));
    };

    const removeTask = (id: string, todolistId: string) => {
        dispatch(tasksActions.removeTask(id, todolistId));
    };

    const changeCheckStatus = (taskId: string, todolistId: string) => {
        dispatch(tasksActions.changeCheckStatus(taskId, todolistId));
    };

    const removeTodolist = (todolistId: string) => {
        dispatch(todolistsActions.removeTodolist(todolistId));
    };

    const addTodolist = (title: string) => {
        dispatch(todolistsActions.addTodolist(title));
    };

    const changeTaskTitle = (
        taskId: string,
        todolistId: string,
        newTitle: string
    ) => {
        dispatch(tasksActions.changeTaskTitle(taskId, todolistId, newTitle));
    };

    const changeTitleTodolist = (todolistId: string, newTitle: string) => {
        dispatch(todolistsActions.changeTodolistTitle(todolistId, newTitle));
    };

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
                    {todolists.map((tl) => {
                        let tasksForTodoList = tasks[tl.id];

                        if (tl.filter === "active") {
                            tasksForTodoList = tasksForTodoList.filter(
                                (t) => !t.isDone
                            );
                        }
                        if (tl.filter === "completed") {
                            tasksForTodoList = tasksForTodoList.filter(
                                (t) => t.isDone
                            );
                        }

                        return (
                            <Grid item key={tl.id}>
                                <Paper
                                    style={{ padding: "10px" }}
                                    elevation={3}
                                >
                                    <Todolist
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
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
