import React, {useCallback, useEffect} from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import styles from "./Todolist.module.scss";

import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Task } from "../Task/Task";
import { FilterType } from "../../state/todolists/todolists-slice";
import { TaskStatus, UpdateTaskData } from "../../api/api";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { RequestStatusType } from "../../state/app/app-slice";
import { getTasksByTodolistId } from "../../state/tasks/tasks-selectors";
import { useActions } from "../../hooks/useActions";
import { tasksActions } from "../../state/tasks";

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
    const { deleteTaskTC, addTaskTC, updateTaskTC } = useActions(tasksActions);
    const tasks = useSelector(getTasksByTodolistId(todolistId));

    console.log(entityStatus)

    const removeTask = useCallback(
        (taskId: string, todolistId: string) => {
            deleteTaskTC({ taskId, todolistId });
        },
        [deleteTaskTC]
    );

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            addTaskTC({ todolistId, title });
        },
        [addTaskTC]
    );

    const changeCheckStatus = useCallback(
        (taskId: string, todolistId: string, status: TaskStatus) => {
            const updateData: Partial<UpdateTaskData> = { status };
            updateTaskTC({ taskId, todolistId, updateData });
        },
        [updateTaskTC]
    );

    const changeTaskTitle = useCallback(
        (newTitle: string, taskId: string, todolistId: string) => {
            const updateData: Partial<UpdateTaskData> = { title: newTitle };
            updateTaskTC({ taskId, todolistId, updateData });
        },
        [updateTaskTC]
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
