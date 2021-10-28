import {
    tasksAPI,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType,
} from "../api/api";
import { ThunkType } from "./store";

import {
    TodolistsActionsTypes,
    TODOLISTS_ACTIONS_TYPE,
} from "./todolists-reducer";

enum TASKS_ACTIONS_TYPE {
    ADD_TASK = "ADD-TASK",
    REMOVE_TASK = "REMOVE-TASK",
    CHANGE_CHECK_STATUS = "CHANGE-CHECK-STATUS",
    CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE",
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
        case TASKS_ACTIONS_TYPE.CHANGE_CHECK_STATUS: {
            return {
                ...state,
                [action.payload.todolistId]: state[
                    action.payload.todolistId
                ].map((task) =>
                    task.id === action.payload.taskId
                        ? {
                              ...task,
                              status:
                                  task.status === TaskStatuses.New
                                      ? TaskStatuses.Completed
                                      : TaskStatuses.New,
                          }
                        : task
                ),
            };
        }
        case TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.payload.todolistId]: state[
                    action.payload.todolistId
                ].map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, title: action.payload.newTitle }
                        : task
                ),
            };
        }
        case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST: {
            return {
                ...state,
                [action.payload.todolistId]: [],
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
    changeCheckStatus: (taskId: string, todolistId: string) => ({
        type: TASKS_ACTIONS_TYPE.CHANGE_CHECK_STATUS as const,
        payload: {
            taskId,
            todolistId,
        },
    }),
    changeTaskTitle: (
        taskId: string,
        todolistId: string,
        newTitle: string
    ) => ({
        type: TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE as const,
        payload: {
            taskId,
            todolistId,
            newTitle,
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
        } catch (err) {
            const u = err as string;
            throw new Error(u);
        }
    };
export const deleteTaskTC =
    (todolistId: string, taskId: string): ThunkType =>
    async (dispatch) => {
        try {
            await tasksAPI.deleteTask(todolistId, taskId);
            dispatch(tasksActions.removeTask(taskId, todolistId));
        } catch (err) {
            const u = err as string;
            throw new Error(u);
        }
    };
export const addTaskTC =
    (todolistId: string, title: string): ThunkType =>
    async (dispatch) => {
        try {
            const {
                data: { item },
            } = await tasksAPI.createTask(todolistId, title);
            dispatch(tasksActions.addTask(item));
        } catch (err) {
            const u = err as string;
            throw new Error(u);
        }
    };
// export const updateTaskTC =
//     (
//         todolistId: string,
//         taskId: string,
//         model: UpdateTaskModelType
//     ): ThunkType =>
//     async (dispatch) => {
//         try {
//             // await tasksAPI.updateTask(todolistId, taskId, model);
//             // dispatch(changeTaskTitleAC(taskId, todolistId, model.title));
//             // dispatch(changeCheckTaskStatusAC(taskId, todolistId));
//             console.log("update task");
//         } catch (err) {
//             const u = err as string;
//             throw new Error(u);
//         }
//     };
