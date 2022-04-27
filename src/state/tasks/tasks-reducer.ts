import { TaskType, UpdateTaskData } from "../../api/api";
import { RequestStatusType } from "../app/app-reducer";
import { TodolistsActionsTypes, TypesOfTodolistsActions } from "../todolists/todolists-reducer";

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
export type UpdateDataType = {
    [key in keyof UpdateTaskData]+?: UpdateTaskData[key];
};
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
