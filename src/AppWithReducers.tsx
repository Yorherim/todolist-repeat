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
import React, { useReducer } from "react";
import { v1 } from "uuid";
import "./App.scss";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { Todolist } from "./components/Todolist/Todolist";
import { tasksActions, tasksReducer } from "./state/tasks-reducer";
import {
    FilterType,
    todolistsActions,
    todolistsReducer,
} from "./state/todolists-reducer";

const AppWithReducers: React.FC = () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            { id: v1(), title: "t", isDone: false },
            { id: v1(), title: "d", isDone: false },
            { id: v1(), title: "c", isDone: true },
        ],
        [todolistId2]: [
            { id: v1(), title: "t", isDone: false },
            { id: v1(), title: "d", isDone: false },
            { id: v1(), title: "c", isDone: true },
        ],
    });
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ]);

    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(tasksActions.removeTask(taskId, todolistId));
    };

    const changeFilter = (newFilter: FilterType, todolistId: string) => {
        dispatchToTodolists(
            todolistsActions.changeTodolistFilter(newFilter, todolistId)
        );
    };

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasks(tasksActions.addTask(title, todolistId));
    };

    const changeCheckStatus = (taskId: string, todolistId: string) => {
        dispatchToTasks(tasksActions.changeTaskStatus(taskId, todolistId));
    };

    const changeTaskTitle = (
        newTitle: string,
        taskId: string,
        todolistId: string
    ) => {
        dispatchToTasks(
            tasksActions.changeTaskTitle(newTitle, taskId, todolistId)
        );
    };

    const removeTodolist = (todolistId: string) => {
        dispatchToTasks(todolistsActions.removeTodolist(todolistId));
        dispatchToTodolists(todolistsActions.removeTodolist(todolistId));
    };

    const addTodolist = (title: string) => {
        dispatchToTodolists(todolistsActions.addTodolist(title));
        dispatchToTasks(todolistsActions.addTodolist(title));
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

export default AppWithReducers;
