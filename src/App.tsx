import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

const tasks: TaskType[] = [
    { id: 1, title: "t", isDone: false },
    { id: 2, title: "d", isDone: false },
    { id: 3, title: "c", isDone: true },
];

function App() {
    return (
        <div className="App">
            <Todolist title="tasks 1" tasks={tasks} />
            <Todolist title="tasks 2" tasks={tasks} />
        </div>
    );
}

export default App;
