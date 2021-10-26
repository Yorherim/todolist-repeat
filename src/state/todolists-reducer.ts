import { v1 } from "uuid";

import { FilterValuesType, TodolistsType } from "../components/app";

export enum TODOLISTS_ACTIONS_TYPE {
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
        case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter((tl) => tl.id !== action.payload.todolistId);
        case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST:
            return [
                ...state,
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: "all",
                },
            ];
        case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE: {
            const todolist = state.find(
                (t) => t.id === action.payload.todolistId
            );
            if (todolist) todolist.title = action.payload.newTitle;
            return [...state];
        }
        case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER: {
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
        type: TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST as const,
        payload: {
            todolistId,
        },
    }),
    addTodolist: (title: string) => ({
        type: TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST as const,
        payload: {
            title,
            todolistId: v1(),
        },
    }),
    changeTodolistTitle: (todolistId: string, newTitle: string) => ({
        type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE as const,
        payload: {
            todolistId,
            newTitle,
        },
    }),
    changeTodolistFilter: (
        filterValue: FilterValuesType,
        todolistId: string
    ) => ({
        type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER as const,
        payload: {
            filterValue,
            todolistId,
        },
    }),
};
