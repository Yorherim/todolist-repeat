import React, { useCallback } from "react";

import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import styles from "./Task.module.scss";

import { TaskType } from "../../state/tasks-reducer";
import { EditableSpan } from "../EditableSpan";

type TaskPropsType = {
    task: TaskType;
    todolistId: string;
    changeCheckStatus: (taskId: string, todolistId: string) => void;
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
            () => changeCheckStatus(task.id, todolistId),
            [changeCheckStatus, todolistId, task.id]
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
            <li key={task.id} className={task.isDone ? styles.isDone : ""}>
                <Checkbox checked={task.isDone} onChange={onChangeTaskStatus} />
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
