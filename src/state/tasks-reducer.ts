import { Dispatch } from "redux";

import Api, { TaskType, UpdateTaskData } from "../api/api";
import { AppRootStateType } from "./store";
import { TodolistsActionsTypes, TypesOfTodolistsActions } from "./todolists-reducer";

enum TypesOfTasksActions {
    ADD_TASK = "ADD_TASK",
    REMOVE_TASK = "REMOVE_TASK",
    CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE",
    CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
    SET_TASKS = "SET_TASKS",
    UPDATE_TASK = "UPDATE_TASK",
}

export interface TasksType {
    [todolistId: string]: TaskType[];
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
                [action.todolistId]: [{ ...action.task }, ...state[action.todolistId]],
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
            stateCopy[action.todolistId] = action.tasks;
            return stateCopy;
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
};

// thunks
export const fetchTasksTC =
    (todolistId: string) => async (dispatch: Dispatch<TasksActionsTypes>) => {
        const {
            data: { items },
        } = await Api.getTasks(todolistId);
        dispatch(tasksActions.setTasks(items, todolistId));
    };
export const deleteTaskTC =
    (taskId: string, todolistId: string) => async (dispatch: Dispatch<TasksActionsTypes>) => {
        await Api.deleteTask(todolistId, taskId);
        dispatch(tasksActions.removeTask(taskId, todolistId));
    };
export const addTaskTC =
    (todolistId: string, title: string) => async (dispatch: Dispatch<TasksActionsTypes>) => {
        const {
            data: {
                data: { item },
            },
        } = await Api.createTask(todolistId, title);
        dispatch(tasksActions.addTask(todolistId, item));
    };
export const updateTaskTC =
    (taskId: string, todolistId: string, updateData: UpdateDataType) =>
    async (dispatch: Dispatch<TasksActionsTypes>, getState: () => AppRootStateType) => {
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
    };
