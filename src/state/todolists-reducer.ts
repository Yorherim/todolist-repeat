import { v1 } from "uuid";
import { TodolistType } from "../api/api";

export enum TypesOfTodolistsActions {
    ADD_TODOLIST = "ADD_TODOLIST",
    REMOVE_TODOLIST = "REMOVE_TODOLIST",
    CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE",
    CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER",
}

export type FilterType = "all" | "active" | "completed";
export type TodolistStateType = TodolistType & {
    filter: FilterType;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistsActionsTypes = ReturnType<InferValueTypes<typeof todolistsActions>>;

const initialState = [] as TodolistStateType[];

export const todolistsReducer = (
    state: TodolistStateType[] = initialState,
    action: TodolistsActionsTypes
): TodolistStateType[] => {
    switch (action.type) {
        case TypesOfTodolistsActions.REMOVE_TODOLIST:
            return state.filter((td) => td.id !== action.todolistId);
        case TypesOfTodolistsActions.ADD_TODOLIST:
            return state.concat({
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0,
            });
        case TypesOfTodolistsActions.CHANGE_TODOLIST_TITLE:
            return state.map((td) =>
                td.id === action.todolistId ? { ...td, title: action.newTitle } : td
            );
        case TypesOfTodolistsActions.CHANGE_TODOLIST_FILTER:
            return state.map((td) =>
                td.id === action.todolistId ? { ...td, filter: action.filter } : td
            );
        default:
            return state;
    }
};

export const todolistsActions = {
    removeTodolist: (todolistId: string) => ({
        type: TypesOfTodolistsActions.REMOVE_TODOLIST as const,
        todolistId,
    }),
    addTodolist: (title: string) => ({
        type: TypesOfTodolistsActions.ADD_TODOLIST as const,
        title,
        todolistId: v1(),
    }),
    changeTodolistTitle: (newTitle: string, todolistId: string) => ({
        type: TypesOfTodolistsActions.CHANGE_TODOLIST_TITLE as const,
        newTitle,
        todolistId,
    }),
    changeTodolistFilter: (filter: FilterType, todolistId: string) => ({
        type: TypesOfTodolistsActions.CHANGE_TODOLIST_FILTER as const,
        filter,
        todolistId,
    }),
};
