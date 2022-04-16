import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/api";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { setLoadingStatus } from "../app/app-slice";
import { AppRootStateType } from "../store";
import { changeTodolistEntityStatus } from "../todolists/todolists-slice";
import { changeTaskEntityStatus, UpdateTaskType } from "./tasks-slice";

export const fetchTasksTC = createAsyncThunk(
    "tasks/fetchTasks",
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(setLoadingStatus({ status: "loading" }));
        try {
            const {
                data: { items: tasks },
            } = await Api.getTasks(todolistId);
            thunkAPI.dispatch(setLoadingStatus({ status: "succeeded" }));
            return { todolistId, tasks };
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch);
        }
    }
);

export const deleteTaskTC = createAsyncThunk(
    "tasks/deleteTask",
    async ({ taskId, todolistId }: { taskId: string; todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoadingStatus({ status: "loading" }));
        thunkAPI.dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }));
        try {
            await Api.deleteTask(todolistId, taskId);
            thunkAPI.dispatch(setLoadingStatus({ status: "succeeded" }));
            thunkAPI.dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "idle" }));
            return { todolistId, taskId };
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch);
            thunkAPI.dispatch(
                changeTaskEntityStatus({ todolistId, taskId, entityStatus: "failed" })
            );
        }
    }
);

export const addTaskTC = createAsyncThunk(
    "tasks/addTask",
    async (
        { todolistId, title }: { todolistId: string; title: string },
        { dispatch, rejectWithValue }
    ) => {
        dispatch(setLoadingStatus({ status: "loading" }));
        dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }));
        try {
            const { data } = await Api.createTask(todolistId, title);
            if (data.resultCode === 0) {
                dispatch(setLoadingStatus({ status: "succeeded" }));
                dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "idle" }));
                return { todolistId, task: data.data.item };
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

export const updateTaskTC = createAsyncThunk(
    "tasks/updateTask",
    async (
        { todolistId, taskId, updateData }: UpdateTaskType,
        { dispatch, getState, rejectWithValue }
    ) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }));

            const state = getState() as AppRootStateType;
            const tasksTodolist = state.tasks[todolistId];
            const task = tasksTodolist.find((t) => t.id === taskId);

            if (task) {
                await Api.updateTask(todolistId, taskId, {
                    title: task.title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    completed: task.completed,
                    status: task.status,
                    ...updateData,
                });

                dispatch(setLoadingStatus({ status: "succeeded" }));
                dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "idle" }));
                return { todolistId, taskId, updateData };
            } else {
                handleServerAppError(["Не удалось обновить таску"], dispatch);
                return rejectWithValue(null);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "failed" }));
            return rejectWithValue(null);
        }
    }
);
