import Api, { TodolistType } from "../../api/api";
import { RequestStatusType, setLoadingStatus } from "../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterType = "all" | "active" | "completed";
export type TodolistStateType = TodolistType & {
    filter: FilterType;
    entityStatus: RequestStatusType;
};

export const fetchTodolistsTC = createAsyncThunk(
    "todolists/fetchTodolists",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            const { data } = await Api.getTodolists();
            dispatch(setLoadingStatus({ status: "succeeded" }));
            return { todolists: data };
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);

export const removeTodolistTC = createAsyncThunk(
    "todolists/removeTodolist",
    async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }));

            const { data } = await Api.deleteTodolist(todolistId);
            if (data.resultCode === 0) {
                dispatch(setLoadingStatus({ status: "succeeded" }));
                dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "idle" }));
                return { todolistId };
            } else {
                handleServerAppError(data.messages, dispatch);
                dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "failed" }));
                return rejectWithValue(null);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "failed" }));
            return rejectWithValue(null);
        }
    }
);

export const addTodolistTC = createAsyncThunk(
    "todolists/addTodolist",
    async (title: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));

            const { data } = await Api.createTodolist(title);
            if (data.resultCode === 0) {
                dispatch(setLoadingStatus({ status: "succeeded" }));
                return { todolist: data.data.item };
            } else {
                handleServerAppError(data.messages, dispatch);
                return rejectWithValue(null);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);

export const changeTodolistTitleTC = createAsyncThunk(
    "todolists/changeTodolistTitle",
    async (
        { todolistId, newTitle }: { todolistId: string; newTitle: string },
        { dispatch, rejectWithValue }
    ) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));

            const { data } = await Api.updateTodolist(todolistId, newTitle);
            if (data.resultCode === 0) {
                dispatch(setLoadingStatus({ status: "succeeded" }));
                return { todolistId, newTitle };
            } else {
                handleServerAppError(data.messages, dispatch);
                return rejectWithValue(null);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);

const slice = createSlice({
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

export const todolistsReducer = slice.reducer;
export const { changeTodolistEntityStatus, changeTodolistFilter } = slice.actions;
