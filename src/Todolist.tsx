import React, { useState } from "react";
import { FilterType } from "./App";

export interface TaskType {
    id: string;
    title: string;
    isDone: boolean;
}

interface TodolistPropsType {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: string) => void;
    filterTasks: (filter: FilterType) => void;
    addTask: (title: string) => void;
}

export const Todolist: React.FC<TodolistPropsType> = ({
    title,
    tasks,
    removeTask,
    filterTasks,
    addTask,
}) => {
    const [inputValue, setInputValue] = useState<string>("");

    const onClickAddTaskHandler = () => {
        addTask(inputValue);
        setInputValue("");
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
                />
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />{" "}
                        <span>{task.title}</span>{" "}
                        <button onClick={() => removeTask(task.id)}>x</button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => filterTasks("all")}>All</button>
                <button onClick={() => filterTasks("active")}>Active</button>
                <button onClick={() => filterTasks("completed")}>
                    Completed
                </button>
            </div>
        </div>
    );
};
