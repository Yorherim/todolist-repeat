import React from "react";
import { FilterType, TaskType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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

    const onChangeTitleTaskHandler = (newTitle: string, taskId: string) => {
        changeTaskTitle(newTitle, taskId, todolistId);
    };

    return (
        <div className={"todolist"}>
            <div className="d-flex">
                <h3>{title}</h3>
                <button onClick={() => removeTodolist(todolistId)}>x</button>
            </div>

            <AddItemForm addItem={onClickAddTaskHandler} />

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={() =>
                                changeCheckStatus(task.id, todolistId)
                            }
                        />{" "}
                        <EditableSpan
                            value={task.title}
                            changeItem={onChangeTitleTaskHandler}
                            itemId={task.id}
                        />{" "}
                        <button onClick={() => removeTask(task.id, todolistId)}>
                            x
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <button
                    onClick={() => changeFilter("all", todolistId)}
                    className={filter === "all" ? "active-filter" : ""}
                >
                    All
                </button>
                <button
                    onClick={() => changeFilter("active", todolistId)}
                    className={filter === "active" ? "active-filter" : ""}
                >
                    Active
                </button>
                <button
                    onClick={() => changeFilter("completed", todolistId)}
                    className={filter === "completed" ? "active-filter" : ""}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
