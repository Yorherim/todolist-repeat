import React, { useCallback } from "react";

import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import styles from "./Task.module.scss";

import { EditableSpan } from "../EditableSpan";
import { TaskStatuses, TaskType } from "../../api/api";

type TaskPropsType = {
    task: TaskType;
    todolistId: string;
    changeCheckStatus: (
        taskId: string,
        todolistId: string,
        taskStatus: TaskStatuses
    ) => void;
    changeTaskTitle: (
        taskId: string,
        todolistId: string,
        newValue: string
    ) => void;
    removeTask: (id: string, todolistId: string) => void;
};

export const Task: React.FC<TaskPropsType> = React.memo(
    ({ task, changeCheckStatus, todolistId, changeTaskTitle, removeTask }) => {
        const onChangeTaskStatus = useCallback(
            () => changeCheckStatus(task.id, todolistId, task.status),
            [changeCheckStatus, todolistId, task.id, task.status]
        );

        const onChangeTaskTitle = useCallback(
            (newValue: string) =>
                changeTaskTitle(task.id, todolistId, newValue),
            [changeTaskTitle, task.id, todolistId]
        );
        const onRemoveTask = useCallback(
            () => removeTask(task.id, todolistId),
            [removeTask, task.id, todolistId]
        );

        return (
            <li
                key={task.id}
                className={
                    task.status === TaskStatuses.Completed ? styles.isDone : ""
                }
            >
                <Checkbox
                    checked={task.status === TaskStatuses.New ? false : true}
                    onChange={onChangeTaskStatus}
                />
                <EditableSpan
                    title={task.title}
                    onChangeTitle={onChangeTaskTitle}
                />
                <IconButton aria-label="delete" onClick={onRemoveTask}>
                    <Delete />
                </IconButton>
            </li>
        );
    }
);
