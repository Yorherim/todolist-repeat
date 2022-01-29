import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm";
import { Todolist } from "./components/Todolist";

export type FilterType = "all" | "active" | "completed";

interface TodolistType {
    id: string;
    title: string;
    filter: FilterType;
}
export interface TaskType {
    id: string;
    title: string;
    isDone: boolean;
}

interface TasksType {
    [id: string]: TaskType[];
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            { id: v1(), title: "t", isDone: false },
            { id: v1(), title: "d", isDone: false },
            { id: v1(), title: "c", isDone: true },
        ],
        [todolistId2]: [
            { id: v1(), title: "t", isDone: false },
            { id: v1(), title: "d", isDone: false },
            { id: v1(), title: "c", isDone: true },
        ],
    });

    console.log(tasks);

    const [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistId1, title: "1st todo", filter: "all" },
        { id: todolistId2, title: "2nd todo", filter: "all" },
    ]);

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(
                (task) => task.id !== taskId
            ),
        });
    };

    const changeFilter = (newFilter: FilterType, todolistId: string) => {
        const todolist = todolists.find((td) => td.id === todolistId);
        if (todolist && todolist.filter !== newFilter) {
            todolist.filter = newFilter;
            setTodolists([...todolists]);
        }
    };

    const addTask = (title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [
                ...tasks[todolistId],
                { id: v1(), title, isDone: false },
            ],
        });
    };

    const changeCheckStatus = (taskId: string, todolistId: string) => {
        const taskIndex = tasks[todolistId].findIndex(
            (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
            setTasks({
                ...tasks,
                [todolistId]: tasks[todolistId].map((task, i) => {
                    if (i === taskIndex) {
                        task.isDone = !task.isDone;
                    }
                    return task;
                }),
            });
        }
    };

    const changeTaskTitle = (
        newTitle: string,
        taskId: string,
        todolistId: string
    ) => {
        const findTask = tasks[todolistId].find((task) => task.id === taskId);
        if (findTask) {
            setTasks({
                ...tasks,
                [todolistId]: tasks[todolistId].map((task, i) => {
                    if (task.id === taskId) {
                        const newTask = { ...task, title: newTitle };
                        return newTask;
                    }
                    return task;
                }),
            });
        }
    };

    const removeTodolist = (todolistId: string) => {
        delete tasks[todolistId];
        setTasks({ ...tasks });
        setTodolists(todolists.filter((td) => td.id !== todolistId));
    };

    const addTodolist = (title: string) => {
        const todolistId = v1();
        setTodolists([...todolists, { id: todolistId, title, filter: "all" }]);
        setTasks({ ...tasks, [todolistId]: [] });
    };

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} className="input-todolist" />

            <div className="d-flex">
                {todolists.map((td) => {
                    let newTasks = tasks[td.id];
                    if (td.filter === "active") {
                        newTasks = newTasks.filter((task) => !task.isDone);
                    }
                    if (td.filter === "completed") {
                        newTasks = newTasks.filter((task) => task.isDone);
                    }

                    return (
                        <Todolist
                            key={td.id}
                            title={td.title}
                            tasks={newTasks}
                            filter={td.filter}
                            todolistId={td.id}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeCheckStatus={changeCheckStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
