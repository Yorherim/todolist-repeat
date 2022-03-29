import { v1 } from "uuid";
import { todolistsActions, todolistsReducer, TodolistStateType } from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let state: TodolistStateType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    state = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
    ];
});

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(state, todolistsActions.removeTodolist(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    const endState = todolistsReducer(state, todolistsActions.addTodolist("New Todolist"));

    expect(endState).toHaveLength(3);
    expect(endState[2].title).toBe("New Todolist");
    expect(typeof endState[2].id).toBe("string");
    expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
    const endState = todolistsReducer(
        state,
        todolistsActions.changeTodolistTitle("New Todolist", todolistId2)
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New Todolist");
});

test("correct filter of todolist should be changed", () => {
    const endState = todolistsReducer(
        state,
        todolistsActions.changeTodolistFilter("completed", todolistId2)
    );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed");
});
