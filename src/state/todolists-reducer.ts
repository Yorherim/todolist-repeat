import { v1 } from "uuid";

import { FilterValuesType, TodolistsType } from "../components/app";

enum TODOLIST_ACTIONS_TYPE {
    REMOVE_TODOLIST = "REMOVE-TODOLIST",
    ADD_TODOLIST = "ADD-TODOLIST",
    CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE",
    CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER",
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistsActionsTypes = ReturnType<
    InferValueTypes<typeof todolistsActions>
>;

export const todolistsReducer = (
    state: TodolistsType[],
    action: TodolistsActionsTypes
): TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.payload.todolistId);
        case "ADD-TODOLIST":
            return [
                ...state,
                { id: v1(), title: action.payload.title, filter: "all" },
            ];
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(
                (t) => t.id === action.payload.todolistId
            );
            if (todolist) todolist.title = action.payload.newTitle;
            return [...state];
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(
                (t) => t.id === action.payload.todolistId
            );
            if (todolist) todolist.filter = action.payload.filterValue;
            return [...state];
        }
        default:
            throw new Error("I don't understand this type");
    }
};

export const todolistsActions = {
    removeTodolist: (todolistId: string) => ({
        type: TODOLIST_ACTIONS_TYPE.REMOVE_TODOLIST as const,
        payload: {
            todolistId,
        },
    }),
    addTodolist: (title: string) => ({
        type: TODOLIST_ACTIONS_TYPE.ADD_TODOLIST as const,
        payload: {
            title,
        },
    }),
    changeTodolistTitle: (todolistId: string, newTitle: string) => ({
        type: TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE as const,
        payload: {
            todolistId,
            newTitle,
        },
    }),
    changeTodolistFilter: (
        filterValue: FilterValuesType,
        todolistId: string
    ) => ({
        type: TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER as const,
        payload: {
            filterValue,
            todolistId,
        },
    }),
};
