import { v1 } from "uuid";
import { todolistsActions, todolistsReducer, TodolistStateType } from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let state: TodolistStateType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    state = [
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
    ];
});

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(state, todolistsActions.removeTodolist(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    const newTodolistId = v1();
    const newTodolist: TodolistStateType = {
        id: newTodolistId,
        title: "new Todolist",
        filter: "all",
        entityStatus: "idle",
        addedDate: "",
        order: 0,
    };
    const endState = todolistsReducer(state, todolistsActions.addTodolist(newTodolist));

    expect(endState).toHaveLength(3);
    expect(endState[2].title).toBe("new Todolist");
    expect(endState[2].id).toBe(newTodolistId);
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

test("todolists should be set", () => {
    const endState = todolistsReducer([], todolistsActions.setTodolists(state));

    expect(endState).toHaveLength(2);
    expect(endState[0].id).toBe(todolistId1);
    expect(endState[1].id).toBe(todolistId2);
});

test("todolists should be change entity status", () => {
    const endState = todolistsReducer(
        state,
        todolistsActions.changeTodolistEntityStatus(todolistId1, "loading")
    );

    expect(endState[0].entityStatus).toBe("loading");
});
