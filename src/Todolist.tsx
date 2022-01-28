import React, { useEffect, useState } from "react";
import { FilterType, TaskType } from "./App";

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
}) => {
    console.log("render td");

    const [inputValue, setInputValue] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }, [error]);

    const onClickAddTaskHandler = () => {
        if (inputValue.trim() !== "") {
            addTask(inputValue.trim(), todolistId);
            setInputValue("");
        } else {
            setError(true);
        }
    };

    const onKeyPressAddTaskHandler = (key: string) => {
        if (key === "Enter") {
            onClickAddTaskHandler();
        }
    };

    return (
        <div>
            <div className="d-flex">
                <h3>{title}</h3>
                <button onClick={() => removeTodolist(todolistId)}>x</button>
            </div>

            <div>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    onKeyPress={(e) => onKeyPressAddTaskHandler(e.key)}
                    className={error ? "error-input" : ""}
                />
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className={"error"}>Field is required</div>}
            </div>
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
                        <span>{task.title}</span>{" "}
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
