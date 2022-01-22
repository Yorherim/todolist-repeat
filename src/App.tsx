import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

export type FilterType = "all" | "active" | "completed";

const initialState: TaskType[] = [
    { id: 1, title: "t", isDone: false },
    { id: 2, title: "d", isDone: false },
    { id: 3, title: "c", isDone: true },
];

function App() {
    const [tasks, setTasks] = useState<TaskType[]>(initialState);
    const [filter, setFilter] = useState<FilterType>("all");

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const filterTasks = (newFilter: FilterType) => {
        if (newFilter === "all" && filter !== "all") {
            setFilter("all");
        }
        if (newFilter === "active" && filter !== "active") {
            setFilter("active");
        }
        if (newFilter === "completed" && filter !== "completed") {
            setFilter("completed");
        }
    };

    let newTasks = tasks;
    if (filter === "active") {
        newTasks = newTasks.filter((task) => !task.isDone);
    }
    if (filter === "completed") {
        newTasks = newTasks.filter((task) => task.isDone);
    }

    return (
        <div className="App">
            <Todolist
                title="tasks 1"
                tasks={newTasks}
                removeTask={removeTask}
                filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
