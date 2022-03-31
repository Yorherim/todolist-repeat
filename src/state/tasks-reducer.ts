import { Dispatch } from "redux";

import Api, { TaskPriorities, TaskStatus, TaskType, UpdateTaskData } from "../api/api";
import { AppRootStateType } from "./store";
import { TodolistsActionsTypes, TypesOfTodolistsActions } from "./todolists-reducer";

enum TypesOfTasksActions {
    ADD_TASK = "ADD_TASK",
    REMOVE_TASK = "REMOVE_TASK",
    CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE",
    CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
    SET_TASKS = "SET_TASKS",
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
        case TypesOfTasksActions.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((td) =>
                    td.id === action.taskId ? { ...td, title: action.newTitle } : td
                ),
            };
        case TypesOfTasksActions.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((td) =>
                    td.id === action.taskId ? { ...td, status: action.status } : td
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
            return { ...state, [action.todolistId]: [] };
        }
        case TypesOfTodolistsActions.SET_TODOLISTS: {
            const newState = { ...state };
            action.todolists.forEach((td) => {
                newState[td.id] = [];
            });
            return newState;
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
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => ({
        type: TypesOfTasksActions.CHANGE_TASK_TITLE as const,
        newTitle,
        taskId,
        todolistId,
    }),
    changeTaskStatus: (taskId: string, todolistId: string, status: TaskStatus) => ({
        type: TypesOfTasksActions.CHANGE_TASK_STATUS as const,
        taskId,
        todolistId,
        status,
    }),
    setTasks: (tasks: TaskType[], todolistId: string) => ({
        type: TypesOfTasksActions.SET_TASKS as const,
        tasks,
        todolistId,
    }),
};

// thunks
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    const {
        data: { items },
    } = await Api.getTasks(todolistId);
    dispatch(tasksActions.setTasks(items, todolistId));
};

export const deleteTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch) => {
    await Api.deleteTask(todolistId, taskId);
    dispatch(tasksActions.removeTask(taskId, todolistId));
};

export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    const {
        data: {
            data: { item },
        },
    } = await Api.createTask(todolistId, title);
    dispatch(tasksActions.addTask(todolistId, item));
};

export const updateTaskTC =
    (
        taskId: string,
        todolistId: string,
        updateData: {
            [key in keyof UpdateTaskData]+?: UpdateTaskData[key];
        }
    ) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

            if (updateData.status) {
                dispatch(tasksActions.changeTaskStatus(taskId, todolistId, updateData.status));
            }
            if (updateData.title) {
                dispatch(tasksActions.changeTaskTitle(updateData.title, taskId, todolistId));
            }
        }
    };
