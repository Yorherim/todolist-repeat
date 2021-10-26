import React, { useReducer } from "react";
import { v1 } from "uuid";

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
    todolistsActions,
    todolistsReducer,
} from "../../state/todolists-reducer";
import { tasksActions, tasksReducer } from "../../state/tasks-reducer";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TaskStateType = {
    [key: string]: Array<TaskType>;
};

export type FilterValuesType = "all" | "active" | "completed";

const App: React.FC = () => {
    console.log("app rerender");

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, dispatchToTodolistsReducer] = useReducer(
        todolistsReducer,
        [
            { id: todolistId1, title: "1st", filter: "all" },
            { id: todolistId2, title: "2nd", filter: "all" },
        ]
    );
    const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "React", isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "salt", isDone: false },
        ],
    });

    const changeTodoListFilter = (
        filterValue: FilterValuesType,
        todolistId: string
    ) => {
        dispatchToTodolistsReducer(
            todolistsActions.changeTodolistTitle(todolistId, filterValue)
        );
    };

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasksReducer(tasksActions.addTask(title, todolistId));
    };

    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasksReducer(tasksActions.removeTask(id, todolistId));
    };

    const changeCheckStatus = (taskId: string, todolistId: string) => {
        dispatchToTasksReducer(
            tasksActions.changeCheckStatus(taskId, todolistId)
        );
    };

    const removeTodolist = (todolistId: string) => {
        dispatchToTodolistsReducer(todolistsActions.removeTodolist(todolistId));
    };

    const addTodolist = (title: string) => {
        dispatchToTodolistsReducer(todolistsActions.addTodolist(title));
    };

    const changeTaskTitle = (
        taskId: string,
        todolistId: string,
        newTitle: string
    ) => {
        dispatchToTasksReducer(
            tasksActions.changeTaskTitle(taskId, todolistId, newTitle)
        );
    };

    const changeTitleTodolist = (todolistId: string, newTitle: string) => {
        dispatchToTodolistsReducer(
            todolistsActions.changeTodolistTitle(todolistId, newTitle)
        );
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
                        let tasksForTodoList = tasksObj[tl.id];

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
