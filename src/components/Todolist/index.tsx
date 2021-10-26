import React, { MouseEvent, useCallback } from "react";

import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import styles from "./Todolist.module.scss";

import { AddItemForm } from "../AddItemForm";
import { EditableSpan } from "../EditableSpan";
import { TaskType } from "../../state/tasks-reducer";
import { FilterValuesType } from "../../state/todolists-reducer";

export type TodolistPropsType = {
    todolistId: string;
    title: string;
    tasks: Array<TaskType>;
    todoListFilter: FilterValuesType;
    changeTodoListFilter: (
        filterValue: FilterValuesType,
        todolistId: string
    ) => void;
    removeTask: (id: string, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeCheckStatus: (taskId: string, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (
        taskId: string,
        todolistId: string,
        newValue: string
    ) => void;
    changeTitleTodolist: (todolistId: string, newTitle: string) => void;
};

export const Todolist: React.FC<TodolistPropsType> = React.memo(
    ({
        title,
        tasks,
        changeTodoListFilter,
        removeTask,
        addTask,
        changeCheckStatus,
        todoListFilter,
        todolistId,
        removeTodolist,
        changeTaskTitle,
        changeTitleTodolist,
    }) => {
        console.log("todolist rerender");

        let taskForTodolists = tasks;

        if (todoListFilter === "active") {
            taskForTodolists = taskForTodolists.filter((t) => !t.isDone);
        }
        if (todoListFilter === "completed") {
            taskForTodolists = taskForTodolists.filter((t) => t.isDone);
        }

        const addItem = useCallback(
            (title: string) => addTask(title, todolistId),
            [addTask, todolistId]
        );

        const onChangeTitle = useCallback(
            (newValue) => changeTitleTodolist(todolistId, newValue),
            [changeTitleTodolist, todolistId]
        );

        const onRemoveTodolist = useCallback(
            () => removeTodolist(todolistId),
            [removeTodolist, todolistId]
        );

        const filterTodoList = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                switch (e.currentTarget.childNodes[0].textContent) {
                    case "Active":
                        return changeTodoListFilter("active", todolistId);
                    case "Completed":
                        return changeTodoListFilter("completed", todolistId);
                    default:
                        return changeTodoListFilter("all", todolistId);
                }
            },
            [changeTodoListFilter, todolistId]
        );

        return (
            <div>
                <div className={styles.titleTodolist}>
                    <h2>
                        <EditableSpan
                            title={title}
                            onChangeTitle={onChangeTitle}
                        />
                    </h2>
                    <IconButton aria-label="delete" onClick={onRemoveTodolist}>
                        <Delete />
                    </IconButton>
                </div>

                <AddItemForm addItem={addItem} placeholder={"Add new task"} />

                <ul className={styles.tasksTodolist}>
                    {taskForTodolists.map((task) => (
                        <li
                            key={task.id}
                            className={task.isDone ? styles.isDone : ""}
                        >
                            <Checkbox
                                checked={task.isDone}
                                onChange={() =>
                                    changeCheckStatus(task.id, todolistId)
                                }
                            />
                            <EditableSpan
                                title={task.title}
                                onChangeTitle={(newValue) =>
                                    changeTaskTitle(
                                        task.id,
                                        todolistId,
                                        newValue
                                    )
                                }
                            />
                            <IconButton
                                aria-label="delete"
                                onClick={() => removeTask(task.id, todolistId)}
                            >
                                <Delete />
                            </IconButton>
                        </li>
                    ))}
                </ul>

                <div className={styles.buttonsTodolist}>
                    <Button
                        variant={
                            todoListFilter === "all" ? "contained" : "text"
                        }
                        onClick={filterTodoList}
                    >
                        All
                    </Button>
                    <Button
                        color={"primary"}
                        variant={
                            todoListFilter === "active" ? "contained" : "text"
                        }
                        onClick={filterTodoList}
                    >
                        Active
                    </Button>
                    <Button
                        color={"secondary"}
                        variant={
                            todoListFilter === "completed"
                                ? "contained"
                                : "text"
                        }
                        onClick={filterTodoList}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        );
    }
);
export default Todolist;
