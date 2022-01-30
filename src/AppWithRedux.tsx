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
import { tasksActions, TasksType } from "./state/tasks-reducer";
import {
    FilterType,
    todolistsActions,
    TodolistType,
} from "./state/todolists-reducer";

export const todolistId1 = v1();
export const todolistId2 = v1();

const AppWithRedux: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TasksType>(
        (state) => state.tasks
    );
    const todolists = useSelector<AppRootStateType, TodolistType[]>(
        (state) => state.todolists
    );

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(tasksActions.removeTask(taskId, todolistId));
    };

    const changeFilter = (newFilter: FilterType, todolistId: string) => {
        dispatch(todolistsActions.changeTodolistFilter(newFilter, todolistId));
    };

    const addTask = (title: string, todolistId: string) => {
        dispatch(tasksActions.addTask(title, todolistId));
    };

    const changeCheckStatus = (taskId: string, todolistId: string) => {
        dispatch(tasksActions.changeTaskStatus(taskId, todolistId));
    };

    const changeTaskTitle = (
        newTitle: string,
        taskId: string,
        todolistId: string
    ) => {
        dispatch(tasksActions.changeTaskTitle(newTitle, taskId, todolistId));
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
                        let newTasks = tasks[td.id];
                        if (td.filter === "active") {
                            newTasks = newTasks.filter((task) => !task.isDone);
                        }
                        if (td.filter === "completed") {
                            newTasks = newTasks.filter((task) => task.isDone);
                        }

                        return (
                            <Grid item key={td.id}>
                                <Paper className="paper">
                                    <Todolist
                                        title={td.title}
                                        tasks={newTasks}
                                        filter={td.filter}
                                        todolistId={td.id}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeCheckStatus={changeCheckStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
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
