import React, { MouseEvent } from "react";

import styles from "./Todolist.module.scss";

import { FilterValuesType, TaskType } from "./../../App";
import { AddItemForm } from "../AddItemForm";

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
    const addItem = (title: string) => addTask(title, todolistId);

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

            <AddItemForm addItem={addItem} />

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
