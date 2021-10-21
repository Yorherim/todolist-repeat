import React from "react";

import "./App.css";

import Todolist from "./components/Todolist";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

const taskOne: Array<TaskType> = [
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "React", isDone: false },
];

const taskTwo: Array<TaskType> = [
    { id: 1, title: "milk", isDone: true },
    { id: 2, title: "bread", isDone: true },
    { id: 3, title: "meat", isDone: false },
];

const App: React.FC = () => {
    return (
        <div className="App">
            <Todolist title={"first"} tasks={taskOne} />
            <Todolist title={"second"} tasks={taskTwo} />
        </div>
    );
};

export default App;
