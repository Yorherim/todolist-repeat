import React, { useState } from "react";

import "./App.css";

import Todolist from "./components/Todolist";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

const App: React.FC = () => {
    console.log("app rerender");

    const [todoListFilter, setTodoListFilter] =
        useState<FilterValuesType>("all");

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML", isDone: true },
        { id: 2, title: "CSS", isDone: true },
        { id: 3, title: "React", isDone: false },
    ]);

    const changeTodoListFilter = (filterValue: FilterValuesType) => {
        setTodoListFilter(filterValue);
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const getTaskForTodoList = () => {
        switch (todoListFilter) {
            case "active":
                return tasks.filter((t) => !t.isDone);
            case "completed":
                return tasks.filter((t) => t.isDone);
            default:
                return tasks;
        }
    };

    return (
        <div className="App">
            <Todolist
                title={todoListFilter}
                tasks={getTaskForTodoList()}
                changeTodoListFilter={changeTodoListFilter}
                removeTask={removeTask}
            />
        </div>
    );
};

export default App;
