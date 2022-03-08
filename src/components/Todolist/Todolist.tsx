import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";

import styles from "./Todolist.module.scss";

import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Task } from "../Task/Task";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { tasksActions, TaskType } from "../../state/tasks-reducer";
import { FilterType } from "../../state/todolists-reducer";

interface TodolistPropsType {
    title: string;
    filter: FilterType;
    todolistId: string;
    changeFilter: (filter: FilterType, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
}

export const Todolist: React.FC<TodolistPropsType> = ({
    title,
    filter,
    todolistId,
    changeFilter,
    removeTodolist,
}) => {
    console.log("rerender todolist");

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TaskType[]>(
        (state) => state.tasks[todolistId]
    );

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(tasksActions.removeTask(taskId, todolistId));
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

    let newTasks = tasks;
    if (filter === "active") {
        newTasks = newTasks.filter((task) => !task.isDone);
    }
    if (filter === "completed") {
        newTasks = newTasks.filter((task) => task.isDone);
    }

    return (
        <div className={styles.todolist}>
            <div className={styles.todolist_title}>
                <h3>{title}</h3>
                <IconButton
                    aria-label="delete"
                    onClick={() => removeTodolist(todolistId)}
                    className={clsx(styles.button, "trash")}
                >
                    <Delete />
                </IconButton>
            </div>

            <AddItemForm addItem={(title) => addTask(title, todolistId)} />

            <ul className={styles.tasks}>
                {newTasks?.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        todolistId={todolistId}
                        changeCheckStatus={changeCheckStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTask={removeTask}
                    />
                ))}
            </ul>

            <div>
                <Button
                    onClick={() => changeFilter("all", todolistId)}
                    variant={filter === "all" ? "contained" : "text"}
                >
                    All
                </Button>
                <Button
                    onClick={() => changeFilter("active", todolistId)}
                    variant={filter === "active" ? "contained" : "text"}
                    color="success"
                >
                    Active
                </Button>
                <Button
                    onClick={() => changeFilter("completed", todolistId)}
                    variant={filter === "completed" ? "contained" : "text"}
                    color="secondary"
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};
