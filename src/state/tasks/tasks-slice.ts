import { addTodolistTC, fetchTodolistsTC, removeTodolistTC } from "../todolists/todolists-actions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskType, UpdateTaskData } from "../../api/api";
import { RequestStatusType } from "../app/app-slice";
import { fetchTasksTC, deleteTaskTC, addTaskTC, updateTaskTC } from "./tasks-actions";

export type TaskStateType = TaskType & { entityStatus: RequestStatusType };
export interface TasksType {
    [todolistId: string]: TaskStateType[];
}
export type UpdateTaskType = {
    taskId: string;
    todolistId: string;
    updateData: Partial<UpdateTaskData>;
};

export const tasksSlice = createSlice({
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
                if (!state[tl.id]) {
                    state[tl.id] = [];
                }
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

export const tasksReducer = tasksSlice.reducer;
export const { changeTaskEntityStatus } = tasksSlice.actions;
