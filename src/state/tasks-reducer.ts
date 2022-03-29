import { v1 } from "uuid";
import { TaskPriorities, TaskStatus, TaskType } from "../api/api";
import { TodolistsActionsTypes, TypesOfTodolistsActions } from "./todolists-reducer";

enum TypesOfTasksActions {
    ADD_TASK = "ADD_TASK",
    REMOVE_TASK = "REMOVE_TASK",
    CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE",
    CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
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
              type: TypesOfTodolistsActions.ADD_TODOLIST | TypesOfTodolistsActions.REMOVE_TODOLIST;
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
                [action.todolistId]: [
                    ...state[action.todolistId],
                    {
                        id: v1(),
                        title: action.title,
                        status: TaskStatus.New,
                        addedDate: "",
                        description: "",
                        startDate: "",
                        order: 0,
                        deadline: "",
                        completed: false,
                        priority: TaskPriorities.Low,
                        todoListId: action.todolistId,
                    },
                ],
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
                    td.id === action.taskId
                        ? {
                              ...td,
                              status:
                                  td.status === TaskStatus.New
                                      ? TaskStatus.Completed
                                      : TaskStatus.New,
                          }
                        : td
                ),
            };
        case TypesOfTodolistsActions.REMOVE_TODOLIST: {
            const newState = { ...state };
            delete newState[action.todolistId];
            return newState;
        }
        case TypesOfTodolistsActions.ADD_TODOLIST: {
            return { ...state, [action.todolistId]: [] };
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
    addTask: (title: string, todolistId: string) => ({
        type: TypesOfTasksActions.ADD_TASK as const,
        title,
        todolistId,
    }),
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => ({
        type: TypesOfTasksActions.CHANGE_TASK_TITLE as const,
        newTitle,
        taskId,
        todolistId,
    }),
    changeTaskStatus: (taskId: string, todolistId: string) => ({
        type: TypesOfTasksActions.CHANGE_TASK_STATUS as const,
        taskId,
        todolistId,
    }),
};
