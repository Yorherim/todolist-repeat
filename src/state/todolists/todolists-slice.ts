import { TodolistType } from "../../api/api";
import { RequestStatusType } from "../app/app-slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchTodolistsTC,
    removeTodolistTC,
    addTodolistTC,
    changeTodolistTitleTC,
} from "./todolists-actions";

export type FilterType = "all" | "active" | "completed";
export type TodolistStateType = TodolistType & {
    filter: FilterType;
    entityStatus: RequestStatusType;
};

export const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as TodolistStateType[],
    reducers: {
        changeTodolistFilter(
            state,
            action: PayloadAction<{ todolistId: string; filter: FilterType }>
        ) {
            const index = state.findIndex((td) => td.id === action.payload.todolistId);
            if (index > -1) {
                state[index].filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus(
            state,
            action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>
        ) {
            const index = state.findIndex((td) => td.id === action.payload.todolistId);
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map((td) => ({
                ...td,
                filter: "all",
                entityStatus: "idle",
            }));
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            return state.filter((td) => td.id !== action.payload.todolistId);
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex((td) => td.id === action.payload.todolistId);
            if (index > -1) {
                state[index].title = action.payload.newTitle;
            }
        });
    },
});

export const todolistsReducer = todolistsSlice.reducer;
export const { changeTodolistEntityStatus, changeTodolistFilter } = todolistsSlice.actions;
