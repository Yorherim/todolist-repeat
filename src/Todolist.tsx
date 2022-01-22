import React from "react";
import { FilterType } from "./App";

export interface TaskType {
    id: number;
    title: string;
    isDone: boolean;
}

interface TodolistPropsType {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: number) => void;
    filterTasks: (filter: FilterType) => void;
}

export const Todolist: React.FC<TodolistPropsType> = ({
    title,
    tasks,
    removeTask,
    filterTasks,
}) => {
    console.log("rerender");

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
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
