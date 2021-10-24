import { v1 } from "uuid";

import { TodolistsType } from "../components/app";

type ActionType = {
    type: string;
    [key: string]: any;
};

export const todolistsReducer = (
    state: TodolistsType[],
    action: ActionType
): TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id);
        case "ADD-TODOLIST":
            return [...state, { id: v1(), title: action.title, filter: "all" }];
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find((t) => t.id === action.id);
            if (todolist) todolist.title = action.title;
            return [...state];
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find((t) => t.id === action.id);
            if (todolist) todolist.filter = action.filter;
            return [...state];
        }
        default:
            throw new Error("I don't understand this type");
    }
};
