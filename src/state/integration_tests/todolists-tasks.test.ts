import { v1 } from "uuid";
import { TaskPriorities, TaskStatus } from "../../api/api";
import { AppRootStateType } from "../store";
import { tasksReducer } from "../tasks/tasks-reducer";
import { todolistsActions, TodolistStateType } from "../todolists/todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let taskId1: string;
let taskId2: string;
let taskId3: string;
let taskId4: string;
let state: Pick<AppRootStateType, "tasks" | "todolists">;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    taskId1 = v1();
    taskId2 = v1();
    taskId3 = v1();
    taskId4 = v1();

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
    const endState = tasksReducer(state.tasks, todolistsActions.removeTodolist(todolistId1));

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
    const todolsitId = v1();
    const newTodolist: TodolistStateType = {
        id: todolsitId,
        title: "new todolist",
        filter: "all",
        addedDate: "",
        order: 0,
        entityStatus: "idle",
    };
    const endState = tasksReducer(state.tasks, todolistsActions.addTodolist(newTodolist));

    expect(Object.keys(endState)).toHaveLength(3);
    expect(Object.keys(endState)[2]).toBe(todolsitId);
    expect(endState[todolsitId]).toEqual([]);
});

test("empty array of tasks should be added when todolists set", () => {
    const endState = tasksReducer({}, todolistsActions.setTodolists(state.todolists));

    expect(Object.keys(endState)).toHaveLength(2);
    expect(Object.keys(endState)[0]).toBe(todolistId1);
    expect(Object.keys(endState)[1]).toBe(todolistId2);
    expect(endState[todolistId1]).toEqual([]);
    expect(endState[todolistId2]).toEqual([]);
});
