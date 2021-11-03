import { tasksAPI, TaskType, UpdateTaskModelType } from "../api/api";
import { appActions } from "./app-reducer";
import { AppRootStateType, ThunkType } from "./store";

import {
    TodolistsActionsTypes,
    TODOLISTS_ACTIONS_TYPE,
} from "./todolists-reducer";

enum TASKS_ACTIONS_TYPE {
    ADD_TASK = "ADD-TASK",
    REMOVE_TASK = "REMOVE-TASK",
    UPDATE_TASK = "UPDATE-TASK",
    SET_TASKS = "SET-TASKS",
}

export type TaskStateType = {
    [key: string]: Array<TaskType>;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TasksActionsTypes = ReturnType<
    InferValueTypes<typeof tasksActions>
>;

export const initialState: TaskStateType = {};

export const tasksReducer = (
    state: TaskStateType = initialState,
    action:
        | TasksActionsTypes
        | Extract<
              TodolistsActionsTypes,
              {
                  type:
                      | TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST
                      | TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST
                      | TODOLISTS_ACTIONS_TYPE.SET_TODOLISTS;
              }
          >
): TaskStateType => {
    switch (action.type) {
        case TASKS_ACTIONS_TYPE.ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [
                    action.payload.task,
                    ...state[action.payload.task.todoListId],
                ],
            };
        case TASKS_ACTIONS_TYPE.REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[
                    action.payload.todolistId
                ].filter((task) => task.id !== action.payload.taskId),
            };
        case TASKS_ACTIONS_TYPE.UPDATE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[
                    action.payload.todolistId
                ].map((task) => {
                    return task.id === action.payload.taskId
                        ? {
                              ...task,
                              ...action.payload.model,
                          }
                        : task;
                }),
            };
        case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST: {
            return {
                ...state,
                [action.payload.todolist.id]: [],
            };
        }
        case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST: {
            const newState = { ...state };
            delete newState[action.payload.todolistId];
            return newState;
        }
        case TODOLISTS_ACTIONS_TYPE.SET_TODOLISTS:
            const newState = { ...state };
            action.payload.todolists.forEach((tl) => {
                newState[tl.id] = [];
            });
            return newState;
        case TASKS_ACTIONS_TYPE.SET_TASKS:
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks,
            };
        default:
            return state;
    }
};

export const tasksActions = {
    addTask: (task: TaskType) => ({
        type: TASKS_ACTIONS_TYPE.ADD_TASK as const,
        payload: {
            task,
        },
    }),
    removeTask: (taskId: string, todolistId: string) => ({
        type: TASKS_ACTIONS_TYPE.REMOVE_TASK as const,
        payload: {
            taskId,
            todolistId,
        },
    }),
    updateTask: (
        taskId: string,
        todolistId: string,
        model: UpdateTaskModelType
    ) => ({
        type: TASKS_ACTIONS_TYPE.UPDATE_TASK as const,
        payload: {
            taskId,
            todolistId,
            model,
        },
    }),
    setTasks: (tasks: TaskType[], todolistId: string) => ({
        type: TASKS_ACTIONS_TYPE.SET_TASKS as const,
        payload: {
            tasks,
            todolistId,
        },
    }),
};

// thunk creators
export const fetchTasksTC =
    (todolistId: string): ThunkType =>
    async (dispatch) => {
        try {
            const { items } = await tasksAPI.getTasks(todolistId);
            dispatch(tasksActions.setTasks(items, todolistId));
            dispatch(appActions.setStatus("succeeded"));
        } catch (err) {
            const u = err as string;
            throw new Error(u);
        }
    };
export const deleteTaskTC =
    (todolistId: string, taskId: string): ThunkType =>
    async (dispatch) => {
        try {
            dispatch(appActions.setStatus("loading"));
            await tasksAPI.deleteTask(todolistId, taskId);
            dispatch(tasksActions.removeTask(taskId, todolistId));
            dispatch(appActions.setStatus("succeeded"));
        } catch (err) {
            const u = err as string;
            throw new Error(u);
        }
    };
export const addTaskTC =
    (todolistId: string, title: string): ThunkType =>
    async (dispatch) => {
        try {
            dispatch(appActions.setStatus("loading"));

            const {
                data: { item },
                resultCode,
                messages,
            } = await tasksAPI.createTask(todolistId, title);

            if (resultCode === 0) {
                dispatch(tasksActions.addTask(item));
            } else {
                if (messages.length) {
                    dispatch(appActions.setError(messages[0]));
                } else {
                    dispatch(appActions.setError("Some error occurred"));
                }
            }

            dispatch(appActions.setStatus("succeeded"));
        } catch (err) {
            const u = err as string;
            throw new Error(u);
        }
    };
export const updateTaskTC =
    (
        todolistId: string,
        taskId: string,
        model: UpdateTaskModelType
    ): ThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(appActions.setStatus("loading"));

            const state = getState();

            const task = state.tasks[todolistId].find(
                (task) => task.id === taskId
            );

            if (task) {
                const apiModel = { ...task, ...model };

                await tasksAPI.updateTask(todolistId, taskId, apiModel);
                dispatch(tasksActions.updateTask(taskId, todolistId, apiModel));
            }

            dispatch(appActions.setStatus("succeeded"));
        } catch (err) {
            const u = err as string;
            throw new Error(u);
        }
    };
