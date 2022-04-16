import {
    addTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
} from "./../todolists/todolists-reducer";
import { nanoid } from "nanoid";

import { TaskPriorities, TaskStatus } from "../../api/api";
import { AppRootStateType } from "../store";
import { tasksReducer } from "../tasks/tasks-reducer";
import { TodolistStateType } from "../todolists/todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let taskId1: string;
let taskId2: string;
let taskId3: string;
let taskId4: string;
let state: Pick<AppRootStateType, "tasks" | "todolists">;

beforeEach(() => {
    todolistId1 = nanoid();
    todolistId2 = nanoid();
    taskId1 = nanoid();
    taskId2 = nanoid();
    taskId3 = nanoid();
    taskId4 = nanoid();

    state = {
        todolists: [
            {
                id: todolistId1,
                title: "What to learn",
                filter: "all",
                addedDate: "",
                order: 0,
                entityStatus: "idle",
            },
            {
                id: todolistId2,
                title: "What to buy",
                filter: "all",
                addedDate: "",
                order: 0,
                entityStatus: "idle",
            },
        ],
        tasks: {
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
                    status: TaskStatus.Completed,
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
                    status: TaskStatus.Completed,
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
        },
    };
});

test("correct tasks should be removed when todolist removed too", () => {
    const endState = tasksReducer(
        state.tasks,
        removeTodolistTC.fulfilled({ todolistId: todolistId1 }, "", todolistId1)
    );

    expect(Object.keys(endState)).toHaveLength(1);
    expect(Object.keys(endState)[0]).toBe(todolistId2);
    expect(endState).toEqual({
        [todolistId2]: [
            {
                id: taskId3,
                title: "c",
                status: TaskStatus.Completed,
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
                status: TaskStatus.Completed,
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
    });
});

test("empty array of tasks should be added when todolist created", () => {
    const todolsitId = nanoid();
    const newTodolist: TodolistStateType = {
        id: todolsitId,
        title: "new todolist",
        filter: "all",
        addedDate: "",
        order: 0,
        entityStatus: "idle",
    };
    const endState = tasksReducer(
        state.tasks,
        addTodolistTC.fulfilled({ todolist: newTodolist }, "", newTodolist.title)
    );

    expect(Object.keys(endState)).toHaveLength(3);
    expect(Object.keys(endState)[2]).toBe(todolsitId);
    expect(endState[todolsitId]).toEqual([]);
});

test("empty array of tasks should be added when todolists set", () => {
    const endState = tasksReducer(
        {},
        fetchTodolistsTC.fulfilled({ todolists: state.todolists }, "")
    );

    expect(Object.keys(endState)).toHaveLength(2);
    expect(Object.keys(endState)[0]).toBe(todolistId1);
    expect(Object.keys(endState)[1]).toBe(todolistId2);
    expect(endState[todolistId1]).toEqual([]);
    expect(endState[todolistId2]).toEqual([]);
});
