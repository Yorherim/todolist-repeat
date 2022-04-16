import {
    addTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
} from "./../todolists/todolists-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import Api, { TaskType, UpdateTaskData } from "../../api/api";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";
import { RequestStatusType, setLoadingStatus } from "../app/app-reducer";
import { AppRootStateType } from "../store";
import { changeTodolistEntityStatus } from "../todolists/todolists-reducer";

export type TaskStateType = TaskType & { entityStatus: RequestStatusType };
export interface TasksType {
    [todolistId: string]: TaskStateType[];
}
export type UpdateTaskType = {
    taskId: string;
    todolistId: string;
    updateData: Partial<UpdateTaskData>;
};

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

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksType,
    reducers: {
        changeTaskEntityStatus(
            state,
            action: PayloadAction<{
                todolistId: string;
                taskId: string;
                entityStatus: RequestStatusType;
            }>
        ) {
            for (let task of state[action.payload.todolistId]) {
                if (task.id === action.payload.taskId) {
                    task.entityStatus = action.payload.entityStatus;
                    break;
                }
            }
        },
    },
    extraReducers: (builder) => {
        // todolists cases
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = [];
            });
        });

        // thunks cases
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload!.todolistId] = action.payload!.tasks.map((t) => {
                return { ...t, entityStatus: "idle" };
            });
        });
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload!.todolistId];
            const index = tasks.findIndex((task) => task.id === action.payload!.taskId);
            tasks.splice(index, 1);
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            const taskState: TaskStateType = { ...action.payload!.task, entityStatus: "idle" };
            state[action.payload!.todolistId].unshift(taskState);
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload!.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload!.taskId);
            tasks[index] = { ...tasks[index], ...action.payload!.updateData };
        });
    },
});

export const tasksReducer = slice.reducer;
export const { changeTaskEntityStatus } = slice.actions;
