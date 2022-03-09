import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useCallback } from "react";

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

export const Todolist: React.FC<TodolistPropsType> = React.memo(function ({
    title,
    filter,
    todolistId,
    changeFilter,
    removeTodolist,
}) {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TaskType[]>(
        (state) => state.tasks[todolistId]
    );

    const removeTask = useCallback(
        (taskId: string, todolistId: string) => {
            dispatch(tasksActions.removeTask(taskId, todolistId));
        },
        [dispatch]
    );

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            dispatch(tasksActions.addTask(title, todolistId));
        },
        [dispatch]
    );

    const changeCheckStatus = useCallback(
        (taskId: string, todolistId: string) => {
            dispatch(tasksActions.changeTaskStatus(taskId, todolistId));
        },
        [dispatch]
    );

    const changeTaskTitle = useCallback(
        (newTitle: string, taskId: string, todolistId: string) => {
            dispatch(
                tasksActions.changeTaskTitle(newTitle, taskId, todolistId)
            );
        },
        [dispatch]
    );

    const addItem = useCallback(
        (title: string) => addTask(title, todolistId),
        [todolistId, addTask]
    );

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

            <AddItemForm addItem={addItem} />

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
});
