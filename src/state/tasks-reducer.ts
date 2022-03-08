import { v1 } from "uuid";
import { TodolistsActionsTypes } from "./todolists-reducer";

export interface TaskType {
    id: string;
    title: string;
    isDone: boolean;
}
export interface TasksType {
    [id: string]: TaskType[];
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TasksActionsTypes =
    | ReturnType<InferValueTypes<typeof tasksActions>>
    | Extract<
          TodolistsActionsTypes,
          {
              type: "ADD-TODOLIST" | "REMOVE-TODOLIST";
          }
      >;

const initialState = {};

export const tasksReducer = (
    state: TasksType = initialState,
    action: TasksActionsTypes
) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(
                    (task) => task.id !== action.taskId
                ),
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    ...state[action.todolistId],
                    { id: v1(), title: action.title, isDone: false },
                ],
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((td) =>
                    td.id === action.taskId
                        ? { ...td, title: action.newTitle }
                        : td
                ),
            };
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((td) =>
                    td.id === action.taskId ? { ...td, isDone: !td.isDone } : td
                ),
            };
        case "REMOVE-TODOLIST": {
            const newState = { ...state };
            delete newState[action.todolistId];
            return newState;
        }
        case "ADD-TODOLIST": {
            return { ...state, [action.todolistId]: [] };
        }
        default:
            return state;
    }
};

export const tasksActions = {
    removeTask: (taskId: string, todolistId: string) => ({
        type: "REMOVE-TASK" as const,
        taskId,
        todolistId,
    }),
    addTask: (title: string, todolistId: string) => ({
        type: "ADD-TASK" as const,
        title,
        todolistId,
    }),
    changeTaskTitle: (
        newTitle: string,
        taskId: string,
        todolistId: string
    ) => ({
        type: "CHANGE-TASK-TITLE" as const,
        newTitle,
        taskId,
        todolistId,
    }),
    changeTaskStatus: (taskId: string, todolistId: string) => ({
        type: "CHANGE-TASK-STATUS" as const,
        taskId,
        todolistId,
    }),
};
