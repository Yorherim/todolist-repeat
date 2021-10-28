import { TaskPriorities, TaskStatuses } from "./../api/api";
import {
    todolistsReducer,
    todolistsActions,
    TodolistsType,
    TodolistsDomainType,
} from "./todolists-reducer";
import { tasksReducer, TaskStateType } from "./tasks-reducer";

const { addTodolist, removeTodolist } = todolistsActions;

test("ids should be equals", () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistsDomainType> = [];

    const action = addTodolist("new todolist");

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
});

test("property with todolistId should be deleted", () => {
    const startState: TaskStateType = {
        todolistId1: [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "1",
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "2",
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "3",
            },
        ],
        todolistId2: [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "1",
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "2",
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "3",
            },
        ],
    };

    const action = removeTodolist("todolistId2");

    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
