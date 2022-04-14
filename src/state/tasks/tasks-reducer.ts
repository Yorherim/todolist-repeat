import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api, { TaskType, UpdateTaskData } from "../../api/api";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";
import { RequestStatusType, setLoadingStatus } from "../app/app-reducer";
import { AppRootStateType, AppThunk } from "../store";
import {
    addTodolist,
    changeTodolistEntityStatus,
    removeTodolist,
    setTodolists,
} from "../todolists/todolists-reducer";

export type TaskStateType = TaskType & { entityStatus: RequestStatusType };
export interface TasksType {
    [todolistId: string]: TaskStateType[];
}
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TasksActionsTypes = ReturnType<InferValueTypes<typeof slice.actions>>;

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksType,
    reducers: {
        removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((task) => task.id === action.payload.taskId);
            tasks.splice(index, 1);
        },
        addTask(state, action: PayloadAction<{ todolistId: string; task: TaskType }>) {
            const taskState: TaskStateType = { ...action.payload.task, entityStatus: "idle" };
            state[action.payload.todolistId].push(taskState);
        },
        updateTask(
            state,
            action: PayloadAction<{
                todolistId: string;
                taskId: string;
                updateData: Partial<UpdateTaskData>;
            }>
        ) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            tasks[index] = { ...tasks[index], ...action.payload.updateData };
        },
        setTasks(state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks.map((t) => {
                return { ...t, entityStatus: "idle" };
            });
        },
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
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = [];
            });
        });
    },
});

export const tasksReducer = slice.reducer;
export const { addTask, changeTaskEntityStatus, removeTask, setTasks, updateTask } = slice.actions;

// thunks
export const fetchTasksTC =
    (todolistId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            const {
                data: { items },
            } = await Api.getTasks(todolistId);
            dispatch(setTasks({ todolistId, tasks: items }));
            dispatch(setLoadingStatus({ status: "succeeded" }));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const deleteTaskTC =
    (taskId: string, todolistId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }));
            await Api.deleteTask(todolistId, taskId);
            dispatch(removeTask({ todolistId, taskId }));
            dispatch(setLoadingStatus({ status: "succeeded" }));
            dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "idle" }));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "failed" }));
        }
    };

export const addTaskTC =
    (todolistId: string, title: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }));
            const { data } = await Api.createTask(todolistId, title);
            if (data.resultCode === 0) {
                dispatch(addTask({ todolistId, task: data.data.item }));
                dispatch(setLoadingStatus({ status: "succeeded" }));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
            dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "idle" }));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const updateTaskTC =
    (taskId: string, todolistId: string, updateData: Partial<UpdateTaskData>): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setLoadingStatus({ status: "loading" }));
            dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }));
            const tasksTodolist = getState().tasks[todolistId];
            const task = tasksTodolist.find((t) => {
                return t.id === taskId;
            });

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
                dispatch(updateTask({ todolistId, taskId, updateData }));
            }
            dispatch(setLoadingStatus({ status: "succeeded" }));
            dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "idle" }));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "failed" }));
        }
    };
