import Api, { TaskType, UpdateTaskData } from "../api/api";
import { handleServerAppError, handleServerNetworkError } from "../common/error-utils";
import { appActions, RequestStatusType } from "./app-reducer";
import { AppRootStateType, AppThunk } from "./store";
import {
    todolistsActions,
    TodolistsActionsTypes,
    TypesOfTodolistsActions,
} from "./todolists-reducer";

enum TypesOfTasksActions {
    ADD_TASK = "ADD_TASK",
    REMOVE_TASK = "REMOVE_TASK",
    CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE",
    CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
    SET_TASKS = "SET_TASKS",
    UPDATE_TASK = "UPDATE_TASK",
    CHANGE_TASK_ENTITY_STATUS = "CHANGE_TASK_ENTITY_STATUS",
}
export type TaskStateType = TaskType & { entityStatus: RequestStatusType };
export interface TasksType {
    [todolistId: string]: TaskStateType[];
}
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TasksActionsTypes =
    | ReturnType<InferValueTypes<typeof tasksActions>>
    | Extract<
          TodolistsActionsTypes,
          {
              type:
                  | TypesOfTodolistsActions.ADD_TODOLIST
                  | TypesOfTodolistsActions.REMOVE_TODOLIST
                  | TypesOfTodolistsActions.SET_TODOLISTS;
          }
      >;
type UpdateDataType = {
    [key in keyof UpdateTaskData]+?: UpdateTaskData[key];
};

const initialState = {} as TasksType;

export const tasksReducer = (
    state: TasksType = initialState,
    action: TasksActionsTypes
): TasksType => {
    switch (action.type) {
        case TypesOfTasksActions.REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(
                    (task) => task.id !== action.taskId
                ),
            };
        case TypesOfTasksActions.ADD_TASK:
            return {
                ...state,
                [action.todolistId]: [
                    { ...action.task, entityStatus: "idle" },
                    ...state[action.todolistId],
                ],
            };
        case TypesOfTasksActions.UPDATE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) =>
                    task.id === action.taskId ? { ...task, ...action.updateData } : task
                ),
            };
        case TypesOfTasksActions.SET_TASKS: {
            const stateCopy = { ...state };
            stateCopy[action.todolistId] = action.tasks.map((td) => {
                return { ...td, entityStatus: "idle" };
            });
            return stateCopy;
        }
        case TypesOfTasksActions.CHANGE_TASK_ENTITY_STATUS: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) =>
                    task.id === action.taskId
                        ? { ...task, entityStatus: action.entityStatus }
                        : task
                ),
            };
        }

        case TypesOfTodolistsActions.REMOVE_TODOLIST: {
            const newState = { ...state };
            delete newState[action.todolistId];
            return newState;
        }
        case TypesOfTodolistsActions.ADD_TODOLIST: {
            return { ...state, [action.todolist.id]: [] };
        }
        case TypesOfTodolistsActions.SET_TODOLISTS: {
            return action.todolists.reduce(
                (acc, td) => {
                    acc[td.id] = [];
                    return acc;
                },
                { ...state }
            );
        }

        default:
            return state;
    }
};

export const tasksActions = {
    removeTask: (taskId: string, todolistId: string) => ({
        type: TypesOfTasksActions.REMOVE_TASK as const,
        taskId,
        todolistId,
    }),
    addTask: (todolistId: string, task: TaskType) => ({
        type: TypesOfTasksActions.ADD_TASK as const,
        todolistId,
        task,
    }),
    updateTask: (taskId: string, todolistId: string, updateData: UpdateDataType) => ({
        type: TypesOfTasksActions.UPDATE_TASK as const,
        taskId,
        todolistId,
        updateData,
    }),
    setTasks: (tasks: TaskType[], todolistId: string) => ({
        type: TypesOfTasksActions.SET_TASKS as const,
        tasks,
        todolistId,
    }),
    changeTaskEntityStatus: (
        taskId: string,
        todolistId: string,
        entityStatus: RequestStatusType
    ) => ({
        type: TypesOfTasksActions.CHANGE_TASK_ENTITY_STATUS as const,
        taskId,
        todolistId,
        entityStatus,
    }),
};

// thunks
export const fetchTasksTC =
    (todolistId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(appActions.setLoadingStatus("loading"));
            const {
                data: { items },
            } = await Api.getTasks(todolistId);
            dispatch(tasksActions.setTasks(items, todolistId));
            dispatch(appActions.setLoadingStatus("succeeded"));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const deleteTaskTC =
    (taskId: string, todolistId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(appActions.setLoadingStatus("loading"));
            dispatch(tasksActions.changeTaskEntityStatus(taskId, todolistId, "loading"));
            await Api.deleteTask(todolistId, taskId);
            dispatch(tasksActions.removeTask(taskId, todolistId));
            dispatch(appActions.setLoadingStatus("succeeded"));
            dispatch(tasksActions.changeTaskEntityStatus(taskId, todolistId, "idle"));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            dispatch(tasksActions.changeTaskEntityStatus(taskId, todolistId, "failed"));
        }
    };

export const addTaskTC =
    (todolistId: string, title: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(appActions.setLoadingStatus("loading"));
            dispatch(todolistsActions.changeTodolistEntityStatus(todolistId, "loading"));
            const { data } = await Api.createTask(todolistId, title);
            if (data.resultCode === 0) {
                dispatch(tasksActions.addTask(todolistId, data.data.item));
                dispatch(appActions.setLoadingStatus("succeeded"));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
            dispatch(todolistsActions.changeTodolistEntityStatus(todolistId, "idle"));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const updateTaskTC =
    (taskId: string, todolistId: string, updateData: UpdateDataType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(appActions.setLoadingStatus("loading"));
            dispatch(tasksActions.changeTaskEntityStatus(taskId, todolistId, "loading"));
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
                dispatch(tasksActions.updateTask(taskId, todolistId, updateData));
            }
            dispatch(appActions.setLoadingStatus("succeeded"));
            dispatch(tasksActions.changeTaskEntityStatus(taskId, todolistId, "idle"));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            dispatch(tasksActions.changeTaskEntityStatus(taskId, todolistId, "failed"));
        }
    };
