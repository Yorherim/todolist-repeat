import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";

import clsx from "clsx";
import React from "react";
import { TaskType } from "../../App";
import { EditableSpan } from "../EditableSpan/EditableSpan";

import styles from "./Task.module.scss";

interface TaskPropsType {
    task: TaskType;
    todolistId: string;
    changeCheckStatus: (taskId: string, todolistId: string) => void;
    changeTaskTitle: (
        newTitle: string,
        taskId: string,
        todolistId: string
    ) => void;
    removeTask: (taskId: string, todolistId: string) => void;
}

export const Task: React.FC<TaskPropsType> = ({
    task,
    todolistId,
    changeCheckStatus,
    changeTaskTitle,
    removeTask,
}) => {
    const onChangeTitleTaskHandler = (newTitle: string, taskId: string) => {
        changeTaskTitle(newTitle, taskId, todolistId);
    };

    return (
        <li className={clsx(styles.task, task.isDone && styles.is_done)}>
            <Checkbox
                checked={task.isDone}
                onChange={() => changeCheckStatus(task.id, todolistId)}
            />
            <EditableSpan
                value={task.title}
                changeItem={onChangeTitleTaskHandler}
                itemId={task.id}
            />
            <IconButton
                aria-label="delete"
                onClick={() => removeTask(task.id, todolistId)}
                className={clsx(styles.button, "trash")}
            >
                <Delete />
            </IconButton>
        </li>
    );
};
