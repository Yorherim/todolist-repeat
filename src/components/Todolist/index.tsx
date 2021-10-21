import React, { ChangeEvent, useState, KeyboardEvent, MouseEvent } from "react";

import styles from "./Todolist.module.scss";

import { FilterValuesType, TaskType } from "./../../App";

type PropsType = {
    todolistId: string;
    title: string;
    tasks: Array<TaskType>;
    todoListFilter: FilterValuesType;
    changeTodoListFilter: (
        filterValue: FilterValuesType,
        todolistId: string
    ) => void;
    removeTask: (id: string, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeCheckStatus: (taskId: string, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
};

const Todolist: React.FC<PropsType> = ({
    title,
    tasks,
    changeTodoListFilter,
    removeTask,
    addTask,
    changeCheckStatus,
    todoListFilter,
    todolistId,
    removeTodolist,
}) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const addTaskAndShowErrorHandler = () => {
        if (newTaskTitle.trim() !== "") {
            addTask(newTaskTitle, todolistId);
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
                return changeTodoListFilter("active", todolistId);
            case "Completed":
                return changeTodoListFilter("completed", todolistId);
            default:
                return changeTodoListFilter("all", todolistId);
        }
    };

    console.log("todolist rerender");
    return (
        <div>
            <div className={styles.titleTodolist}>
                <h3>{title}</h3>
                <button onClick={() => removeTodolist(todolistId)}>x</button>
            </div>

            <div className={styles.inputTitleTask}>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? styles.error : ""}
                />
                <button onClick={addTaskAndShowErrorHandler}>+</button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>

            <ul className={styles.tasksTodolist}>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={task.isDone ? styles.isDone : ""}
                    >
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={() =>
                                changeCheckStatus(task.id, todolistId)
                            }
                        />
                        <span>{task.title}</span>
                        <button onClick={() => removeTask(task.id, todolistId)}>
                            x
                        </button>
                    </li>
                ))}
            </ul>

            <div className={styles.buttonsTodolist}>
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
