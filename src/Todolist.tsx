import React, { useEffect, useState } from "react";
import { FilterType } from "./App";

export interface TaskType {
    id: string;
    title: string;
    isDone: boolean;
}

interface TodolistPropsType {
    title: string;
    tasks: TaskType[];
    filter: FilterType;
    removeTask: (taskId: string) => void;
    filterTasks: (filter: FilterType) => void;
    addTask: (title: string) => void;
    changeCheckStatus: (taskId: string) => void;
}

export const Todolist: React.FC<TodolistPropsType> = ({
    title,
    tasks,
    filter,
    removeTask,
    filterTasks,
    addTask,
    changeCheckStatus,
}) => {
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
            addTask(inputValue.trim());
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
            <h3>{title}</h3>
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
                            onChange={() => changeCheckStatus(task.id)}
                        />{" "}
                        <span>{task.title}</span>{" "}
                        <button onClick={() => removeTask(task.id)}>x</button>
                    </li>
                ))}
            </ul>
            <div>
                <button
                    onClick={() => filterTasks("all")}
                    className={filter === "all" ? "active-filter" : ""}
                >
                    All
                </button>
                <button
                    onClick={() => filterTasks("active")}
                    className={filter === "active" ? "active-filter" : ""}
                >
                    Active
                </button>
                <button
                    onClick={() => filterTasks("completed")}
                    className={filter === "completed" ? "active-filter" : ""}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
