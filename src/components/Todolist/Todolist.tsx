import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";

import styles from "./Todolist.module.scss";

import { FilterType, TaskType } from "../../App";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Task } from "../Task/Task";
import clsx from "clsx";

interface TodolistPropsType {
    title: string;
    tasks: TaskType[];
    filter: FilterType;
    todolistId: string;
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (filter: FilterType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeCheckStatus: (taskId: string, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (
        newTitle: string,
        taskId: string,
        todolistId: string
    ) => void;
}

export const Todolist: React.FC<TodolistPropsType> = ({
    title,
    tasks,
    filter,
    todolistId,
    removeTask,
    changeFilter,
    addTask,
    changeCheckStatus,
    removeTodolist,
    changeTaskTitle,
}) => {
    const onClickAddTaskHandler = (title: string) => {
        addTask(title, todolistId);
    };

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

            <AddItemForm addItem={onClickAddTaskHandler} />

            <ul className={styles.tasks}>
                {tasks.map((task) => (
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
