import React from "react";

import { FilterValuesType, TaskType } from "./../../App";

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    changeTodoListFilter: (filterValue: FilterValuesType) => void;
    removeTask: (id: number) => void;
};

const Todolist: React.FC<PropsType> = ({
    title,
    tasks,
    changeTodoListFilter,
    removeTask,
}) => {
    console.log("todolist rerender");
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
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <button onClick={() => removeTask(task.id)}>x</button>
                    </li>
                ))}
            </ul>

            <div>
                <button onClick={() => changeTodoListFilter("all")}>All</button>
                <button onClick={() => changeTodoListFilter("active")}>
                    Active
                </button>
                <button onClick={() => changeTodoListFilter("completed")}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;
