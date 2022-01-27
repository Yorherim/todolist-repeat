import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

export type FilterType = "all" | "active" | "completed";

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: "t", isDone: false },
        { id: v1(), title: "d", isDone: false },
        { id: v1(), title: "c", isDone: true },
    ]);
    const [filter, setFilter] = useState<FilterType>("all");

    const removeTask = (taskId: string) => {
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

    const addTask = (title: string) => {
        setTasks([...tasks, { id: v1(), title, isDone: false }]);
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
                addTask={addTask}
            />
        </div>
    );
}

export default App;
