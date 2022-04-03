import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";

import clsx from "clsx";
import React, { useCallback } from "react";
import { TaskStatus } from "../../api/api";
import { TaskStateType } from "../../state/tasks-reducer";

import { EditableSpan } from "../EditableSpan/EditableSpan";

import styles from "./Task.module.scss";

interface TaskPropsType {
    task: TaskStateType;
    todolistId: string;
    changeCheckStatus: (taskId: string, todolistId: string, status: TaskStatus) => void;
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => void;
    removeTask: (taskId: string, todolistId: string) => void;
}

export const Task: React.FC<TaskPropsType> = React.memo(function ({
    task,
    todolistId,
    changeCheckStatus,
    changeTaskTitle,
    removeTask,
}) {
    const onChangeTitleTaskHandler = useCallback(
        (newTitle: string, taskId: string) => {
            changeTaskTitle(newTitle, taskId, todolistId);
        },
        [todolistId, changeTaskTitle]
    );

    const changeStatus = () => {
        const status = task.status === TaskStatus.Completed ? TaskStatus.New : TaskStatus.Completed;
        changeCheckStatus(task.id, todolistId, status);
    };

    return (
        <li className={clsx(styles.task, task.status === TaskStatus.Completed && styles.is_done)}>
            <Checkbox
                checked={task.status === TaskStatus.Completed}
                onChange={changeStatus}
                disabled={task.entityStatus === "loading"}
            />
            <EditableSpan
                value={task.title}
                changeItem={onChangeTitleTaskHandler}
                itemId={task.id}
                disabled={task.entityStatus === "loading"}
            />
            <IconButton
                aria-label="delete"
                onClick={() => removeTask(task.id, todolistId)}
                className={clsx(styles.button, "trash")}
                disabled={task.entityStatus === "loading"}
            >
                <Delete />
            </IconButton>
        </li>
    );
});
