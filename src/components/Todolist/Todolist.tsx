import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import styles from "./Todolist.module.scss";

import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Task } from "../Task/Task";
import { AppRootStateType } from "../../state/store";
import {
    addTaskTC,
    deleteTaskTC,
    fetchTasksTC,
    TaskStateType,
    updateTaskTC,
} from "../../state/tasks/tasks-reducer";
import { FilterType } from "../../state/todolists/todolists-reducer";
import { TaskStatus } from "../../api/api";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { RequestStatusType } from "../../state/app/app-reducer";

interface TodolistPropsType {
    title: string;
    filter: FilterType;
    entityStatus: RequestStatusType;
    todolistId: string;
    changeFilter: (filter: FilterType, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (newTitle: string, todolistId: string) => void;
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(function ({
    title,
    filter,
    entityStatus,
    todolistId,
    changeFilter,
    removeTodolist,
    changeTodolistTitle,
}) {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TaskStateType[]>(
        (state) => state.tasks[todolistId]
    );

    useEffect(() => {
        dispatch(fetchTasksTC(todolistId));
    }, [dispatch, todolistId]);

    const removeTask = useCallback(
        (taskId: string, todolistId: string) => {
            dispatch(deleteTaskTC(taskId, todolistId));
        },
        [dispatch]
    );

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            dispatch(addTaskTC(todolistId, title));
        },
        [dispatch]
    );

    const changeCheckStatus = useCallback(
        (taskId: string, todolistId: string, status: TaskStatus) => {
            dispatch(updateTaskTC(taskId, todolistId, { status }));
        },
        [dispatch]
    );

    const changeTaskTitle = useCallback(
        (newTitle: string, taskId: string, todolistId: string) => {
            dispatch(updateTaskTC(taskId, todolistId, { title: newTitle }));
        },
        [dispatch]
    );

    const addItem = useCallback(
        (title: string) => addTask(title, todolistId),
        [todolistId, addTask]
    );

    let newTasks = tasks;
    if (filter === "active") {
        newTasks = newTasks.filter((task) => task.status === TaskStatus.New);
    }
    if (filter === "completed") {
        newTasks = newTasks.filter((task) => task.status === TaskStatus.Completed);
    }

    return (
        <div className={styles.todolist}>
            <div className={styles.todolist_title}>
                <EditableSpan
                    value={title}
                    changeItem={changeTodolistTitle}
                    itemId={todolistId}
                    disabled={entityStatus === "loading"}
                />
                <IconButton
                    aria-label="delete"
                    onClick={() => removeTodolist(todolistId)}
                    className={clsx(styles.button, "trash")}
                    disabled={entityStatus === "loading"}
                >
                    <Delete />
                </IconButton>
            </div>

            <AddItemForm addItem={addItem} disabled={entityStatus === "loading"} />

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
