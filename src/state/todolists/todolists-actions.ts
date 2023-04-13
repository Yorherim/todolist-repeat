import Api from "../../api/api";
import { setLoadingStatus } from "../app/app-slice";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeTodolistEntityStatus } from "./todolists-slice";
import {fetchTasksTC} from "../tasks/tasks-actions";

export const fetchTodolistsTC = createAsyncThunk(
    "todolists/fetchTodolists",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            const { data } = await Api.getTodolists();
            for (let i = 0; i < data.length; i++) {
                console.log('wtf')
                const todolistId = data[i].id
                dispatch(fetchTasksTC(todolistId))
            }
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
