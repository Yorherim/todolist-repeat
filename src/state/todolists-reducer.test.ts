import { v1 } from "uuid";
import { TodolistsType } from "../api/api";

import {
    todolistsActions,
    TodolistsDomainType,
    todolistsReducer,
} from "./todolists-reducer";

const todolistId1 = v1();
const todolistId2 = v1();
let startState: TodolistsDomainType[];

const {
    addTodolist,
    removeTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
} = todolistsActions;

beforeEach(() => {
    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            addedDate: "",
            order: 0,
            filter: "all",
        },
        {
            id: todolistId2,
            title: "What to buy",
            addedDate: "",
            order: 0,
            filter: "all",
        },
    ];
});

it("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolist(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState !== startState).toBeTruthy();
});

it("correct todolist should be added", () => {
    const newTodolist: TodolistsType = {
        id: "123",
        addedDate: "",
        order: 0,
        title: "New Todolist",
    };
    const endState = todolistsReducer(startState, addTodolist(newTodolist));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
    expect(endState !== startState).toBeTruthy();
});

it("correct todolist should change it's name", () => {
    const endState = todolistsReducer(
        startState,
        changeTodolistTitle(todolistId2, "New Todolist")
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New Todolist");
    expect(endState[1] !== startState[1]).toBeTruthy();
});

it("correct filter of todolist should be changed", () => {
    const endState = todolistsReducer(
        startState,
        changeTodolistFilter("completed", todolistId2)
    );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed");
    expect(endState[1] !== startState[1]).toBeTruthy();
});
