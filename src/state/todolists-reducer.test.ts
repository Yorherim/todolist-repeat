import { v1 } from "uuid";

import { todolistsReducer } from "./todolists-reducer";
import { FilterValuesType, TodolistsType } from "../components/app";

const todolistId1 = v1();
const todolistId2 = v1();
let startState: TodolistsType[];

beforeEach(() => {
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];
});

it("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, {
        type: "REMOVE-TODOLIST",
        id: todolistId1,
    });

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

it("correct todolist should be added", () => {
    const newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, {
        type: "ADD-TODOLIST",
        title: newTodolistTitle,
    });

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined();
});

it("correct todolist should change it's name", () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodolistTitle,
    });

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

it("correct filter of todolist should be changed", () => {
    let newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(startState, {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        filter: newFilter,
    });

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
