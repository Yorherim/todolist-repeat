import { v1 } from "uuid";
import { TaskPriorities, TaskStatus } from "../api/api";
import { tasksReducer, TasksType } from "./tasks-reducer";
import { todolistsActions, TodolistStateType } from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let taskId1: string;
let taskId2: string;
let taskId3: string;
let taskId4: string;
let todolistsState: TodolistStateType[];
let tasksState: TasksType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    taskId1 = v1();
    taskId2 = v1();
    taskId3 = v1();
    taskId4 = v1();
    todolistsState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
    ];
    tasksState = {
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
            },
        ],
    };
});

test("correct tasks should be removed when todolist removed too", () => {
    const endState = tasksReducer(tasksState, todolistsActions.removeTodolist(todolistId1));

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
            },
        ],
    });
});

test("empty array of tasks should be added when todolist created", () => {
    const endState = tasksReducer(tasksState, todolistsActions.addTodolist("new todolist"));

    const newTodolistId: string = Object.keys(endState)[2];

    expect(Object.keys(endState)).toHaveLength(3);
    expect(Object.keys(endState)[2]).toBe(newTodolistId);
    expect(endState[newTodolistId]).toEqual([]);
});

test("array of tasks should be added when todolist created", () => {
    const endState = tasksReducer(tasksState, todolistsActions.setTodolists(todolistsState));

    expect(Object.keys(endState)).toHaveLength(2);
    expect(Object.keys(endState)[0]).toBe(todolistId1);
    expect(Object.keys(endState)[1]).toBe(todolistId2);
});
