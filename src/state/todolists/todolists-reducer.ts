import Api, { TodolistType } from "../../api/api";
import { RequestStatusType, setLoadingStatus } from "../app/app-reducer";
import { AppThunk } from "../store";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TypesOfTodolistsActions {
    ADD_TODOLIST = "ADD_TODOLIST",
    REMOVE_TODOLIST = "REMOVE_TODOLIST",
    CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE",
    CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER",
    SET_TODOLISTS = "SET_TODOLISTS",
    CHANGE_TODOLIST_ENTITY_STATUS = "CHANGE_TODOLIST_ENTITY_STATUS",
}

export type FilterType = "all" | "active" | "completed";
export type TodolistStateType = TodolistType & {
    filter: FilterType;
    entityStatus: RequestStatusType;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistsActionsTypes = ReturnType<InferValueTypes<typeof slice.actions>>;

const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistStateType[],
    reducers: {
        removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
            return state.filter((td) => td.id !== action.payload.todolistId);
        },
        addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.push({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
        },
        changeTodolistTitle(
            state,
            action: PayloadAction<{ todolistId: string; newTitle: string }>
        ) {
            const index = state.findIndex((td) => td.id === action.payload.todolistId);
            if (index > -1) {
                state[index].title = action.payload.newTitle;
            }
        },
        changeTodolistFilter(
            state,
            action: PayloadAction<{ todolistId: string; filter: FilterType }>
        ) {
            const index = state.findIndex((td) => td.id === action.payload.todolistId);
            if (index > -1) {
                state[index].filter = action.payload.filter;
            }
        },
        setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map((td) => ({
                ...td,
                filter: "all",
                entityStatus: "idle",
            }));
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
});

export const todolistsReducer = slice.reducer;
export const {
    addTodolist,
    changeTodolistEntityStatus,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist,
    setTodolists,
} = slice.actions;

// thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setLoadingStatus({ status: "loading" }));
        const { data } = await Api.getTodolists();
        dispatch(setTodolists({ todolists: data }));
        dispatch(setLoadingStatus({ status: "succeeded" }));
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
};

export const removeTodolistTC =
    (todolistId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }));
            const { data } = await Api.deleteTodolist(todolistId);
            if (data.resultCode === 0) {
                dispatch(removeTodolist({ todolistId }));
                dispatch(setLoadingStatus({ status: "succeeded" }));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        } finally {
            dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "idle" }));
        }
    };

export const addTodolistTC =
    (title: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            const { data } = await Api.createTodolist(title);
            if (data.resultCode === 0) {
                dispatch(addTodolist({ todolist: data.data.item }));
                dispatch(setLoadingStatus({ status: "succeeded" }));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const changeTodolistTitleTC =
    (newTitle: string, todolistId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            const { data } = await Api.updateTodolist(todolistId, newTitle);
            if (data.resultCode === 0) {
                dispatch(changeTodolistTitle({ todolistId, newTitle }));
                dispatch(setLoadingStatus({ status: "succeeded" }));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };
