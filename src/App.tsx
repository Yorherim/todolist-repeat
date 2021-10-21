import React, { useState } from "react";
import { v1 } from "uuid";

import "./App.scss";

import Todolist from "./components/Todolist";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type FilterValuesType = "all" | "active" | "completed";

const App: React.FC = () => {
    console.log("app rerender");

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "React", isDone: false },
    ]);

    const [todolists, setTodolist] = useState<Array<TodolistsType>>([
        { id: v1(), title: "1st", filter: "all" },
        { id: v1(), title: "2nd", filter: "all" },
    ]);

    const changeTodoListFilter = (
        filterValue: FilterValuesType,
        todolistId: string
    ) => {
        const todolist = todolists.find((tl) => tl.id === todolistId);
        if (todolist) {
            todolist.filter = filterValue;
            setTodolist([...todolists]);
        }
    };

    const addTask = (title: string) => {
        const newTask = { id: v1(), title, isDone: false };
        setTasks([newTask, ...tasks]);
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const changeCheckStatus = (taskId: string) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) task.isDone = !task.isDone;
        setTasks([...tasks]);
    };

    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodoList = tasks;

                if (tl.filter === "active") {
                    tasksForTodoList = tasks.filter((t) => !t.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = tasks.filter((t) => t.isDone);
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeCheckStatus={changeCheckStatus}
                        todoListFilter={tl.filter}
                    />
                );
            })}
        </div>
    );
};

export default App;
