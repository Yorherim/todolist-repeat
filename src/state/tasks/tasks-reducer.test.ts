import { nanoid } from "@reduxjs/toolkit";
import { TaskPriorities, TaskStatus } from "../../api/api";
import {
    addTask,
    changeTaskEntityStatus,
    removeTask,
    setTasks,
    tasksReducer,
    TaskStateType,
    TasksType,
    updateTask,
} from "./tasks-reducer";

let todolistId1: string;
let todolistId2: string;
let taskId1: string;
let taskId2: string;
let taskId3: string;
let taskId4: string;
let state: TasksType;

beforeEach(() => {
    todolistId1 = nanoid();
    todolistId2 = nanoid();
    taskId1 = nanoid();
    taskId2 = nanoid();
    taskId3 = nanoid();
    taskId4 = nanoid();
    state = {
        [todolistId1]: [
            {
                id: taskId1,
                title: "a",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId1,
                entityStatus: "idle",
            },
            {
                id: taskId2,
                title: "b",
                status: TaskStatus.Completed,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId1,
                entityStatus: "idle",
            },
        ],
        [todolistId2]: [
            {
                id: taskId3,
                title: "c",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId2,
                entityStatus: "idle",
            },
            {
                id: taskId4,
                title: "d",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId2,
                entityStatus: "idle",
            },
        ],
    };
});

test("correct task should be removed", () => {
    const endState = tasksReducer(state, removeTask({ todolistId: todolistId1, taskId: taskId1 }));

    expect(endState[todolistId1]).toHaveLength(1);
    expect(endState[todolistId2]).toHaveLength(2);
    expect(endState[todolistId1][0].title).toBe("b");
    expect(endState[todolistId1][0].id).toBe(taskId2);
});

test("correct task should be added", () => {
    const newTask: TaskStateType = {
        id: nanoid(),
        title: "new task",
        status: TaskStatus.New,
        addedDate: "",
        description: "",
        startDate: "",
        order: 0,
        deadline: "",
        completed: false,
        priority: TaskPriorities.Low,
        todoListId: todolistId2,
        entityStatus: "idle",
    };

    const endState = tasksReducer(state, addTask({ todolistId: todolistId1, task: newTask }));

    expect(endState[todolistId1]).toHaveLength(3);
    expect(endState[todolistId2]).toHaveLength(2);
    expect(endState[todolistId1][2].title).toBe("new task");
});

test("correct task should be changed title", () => {
    const endState = tasksReducer(
        state,
        updateTask({
            todolistId: todolistId1,
            taskId: taskId1,
            updateData: { title: "update task title" },
        })
    );

    expect(endState[todolistId1][0].title).toBe("update task title");
    expect(endState[todolistId1][1].title).toBe("b");
});

test("tasks should be set", () => {
    const endState = tasksReducer(
        { todolistId1: [] },
        setTasks({ todolistId: todolistId1, tasks: state[todolistId1] })
    );
    expect(endState[todolistId1]).toHaveLength(2);
});

test("task should be change entity status", () => {
    const endState = tasksReducer(
        state,
        changeTaskEntityStatus({
            todolistId: todolistId1,
            taskId: taskId1,
            entityStatus: "loading",
        })
    );
    expect(endState[todolistId1][0].entityStatus).toBe("loading");
});
