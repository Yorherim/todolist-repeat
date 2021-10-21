import React, { ChangeEvent, useState, KeyboardEvent, MouseEvent } from "react";

import styles from "./Todolist.module.scss";

import { FilterValuesType, TaskType } from "./../../App";

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    changeTodoListFilter: (filterValue: FilterValuesType) => void;
    removeTask: (id: string) => void;
    addTask: (title: string) => void;
    changeCheckStatus: (taskId: string) => void;
    todoListFilter: FilterValuesType;
};

const Todolist: React.FC<PropsType> = ({
    title,
    tasks,
    changeTodoListFilter,
    removeTask,
    addTask,
    changeCheckStatus,
    todoListFilter,
}) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const addTaskAndShowErrorHandler = () => {
        if (newTaskTitle.trim() !== "") {
            addTask(newTaskTitle);
            setNewTaskTitle("");
        } else {
            setError("Title is required");
            setTimeout(() => setError(null), 2500);
        }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskAndShowErrorHandler();
        }
    };

    const filterTodoList = (e: MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.innerText) {
            case "Active":
                return changeTodoListFilter("active");
            case "Completed":
                return changeTodoListFilter("completed");
            default:
                return changeTodoListFilter("all");
        }
    };

    console.log("todolist rerender");
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? styles.error : ""}
                />
                <button onClick={addTaskAndShowErrorHandler}>+</button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>

            <ul>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={task.isDone ? styles.isDone : ""}
                    >
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={() => changeCheckStatus(task.id)}
                        />
                        <span>{task.title}</span>
                        <button onClick={() => removeTask(task.id)}>x</button>
                    </li>
                ))}
            </ul>

            <div>
                <button
                    className={
                        todoListFilter === "all" ? styles.activeFilter : ""
                    }
                    onClick={filterTodoList}
                >
                    All
                </button>
                <button
                    className={
                        todoListFilter === "active" ? styles.activeFilter : ""
                    }
                    onClick={filterTodoList}
                >
                    Active
                </button>
                <button
                    className={
                        todoListFilter === "completed"
                            ? styles.activeFilter
                            : ""
                    }
                    onClick={filterTodoList}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;
