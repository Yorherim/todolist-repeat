import { v1 } from "uuid";

export type FilterType = "all" | "active" | "completed";
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistsActionsTypes = ReturnType<
    InferValueTypes<typeof todolistsActions>
>;

const initialState = [] as TodolistType[];

export const todolistsReducer = (
    state: TodolistType[] = initialState,
    action: TodolistsActionsTypes
) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((td) => td.id !== action.todolistId);
        case "ADD-TODOLIST":
            return state.concat({
                id: action.todolistId,
                title: action.title,
                filter: "all",
            });
        case "CHANGE-TODOLIST-TITLE":
            return state.map((td) =>
                td.id === action.todolistId
                    ? { ...td, title: action.newTitle }
                    : td
            );
        case "CHANGE-TODOLIST-FILTER":
            return state.map((td) =>
                td.id === action.todolistId
                    ? { ...td, filter: action.filter }
                    : td
            );
        default:
            return state;
    }
};

export const todolistsActions = {
    removeTodolist: (todolistId: string) => ({
        type: "REMOVE-TODOLIST" as const,
        todolistId,
    }),
    addTodolist: (title: string) => ({
        type: "ADD-TODOLIST" as const,
        title,
        todolistId: v1(),
    }),
    changeTodolistTitle: (newTitle: string, todolistId: string) => ({
        type: "CHANGE-TODOLIST-TITLE" as const,
        newTitle,
        todolistId,
    }),
    changeTodolistFilter: (filter: FilterType, todolistId: string) => ({
        type: "CHANGE-TODOLIST-FILTER" as const,
        filter,
        todolistId,
    }),
};
