import React from "react";

export interface TaskType {
    id: number;
    title: string;
    isDone: boolean;
}

interface TodolistPropsType {
    title: string;
    tasks: TaskType[];
}

export const Todolist: React.FC<TodolistPropsType> = ({ title, tasks }) => {
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
                        <span>{task.title}</span>
                    </li>
                ))}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
