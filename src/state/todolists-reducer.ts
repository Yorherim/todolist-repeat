import Api, { TodolistType } from "../api/api";
import { appActions, RequestStatusType } from "./app-reducer";
import { AppThunk } from "./store";
import { handleServerAppError, handleServerNetworkError } from "../common/error-utils";

export enum TypesOfTodolistsActions {
    ADD_TODOLIST = "ADD_TODOLIST",
    REMOVE_TODOLIST = "REMOVE_TODOLIST",
    CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE",
    CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER",
    SET_TODOLISTS = "SET_TODOLISTS",
    CHANGE_TODOLIST_ENTITY_STATUS = "CHANGE_TODOLIST_ENTITY_STATUS",
}

export type FilterType = "all" | "active" | "completed";
export type TodolistStateType = TodolistType & {
    filter: FilterType;
    entityStatus: RequestStatusType;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistsActionsTypes = ReturnType<InferValueTypes<typeof todolistsActions>>;

const initialState = [] as TodolistStateType[];

export const todolistsReducer = (
    state: TodolistStateType[] = initialState,
    action: TodolistsActionsTypes
): TodolistStateType[] => {
    switch (action.type) {
        case TypesOfTodolistsActions.REMOVE_TODOLIST:
            return state.filter((td) => td.id !== action.todolistId);
        case TypesOfTodolistsActions.ADD_TODOLIST:
            return state.concat({
                ...action.todolist,
                filter: "all",
                entityStatus: "idle",
            });
        case TypesOfTodolistsActions.CHANGE_TODOLIST_TITLE:
            return state.map((td) =>
                td.id === action.todolistId ? { ...td, title: action.newTitle } : td
            );
        case TypesOfTodolistsActions.CHANGE_TODOLIST_FILTER:
            return state.map((td) =>
                td.id === action.todolistId ? { ...td, filter: action.filter } : td
            );
        case TypesOfTodolistsActions.SET_TODOLISTS:
            return action.todolists.map((td) => ({
                ...td,
                filter: "all",
                entityStatus: "idle",
            }));
        case TypesOfTodolistsActions.CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map((td) =>
                td.id === action.todolistId ? { ...td, entityStatus: action.entityStatus } : td
            );
        default:
            return state;
    }
};

export const todolistsActions = {
    removeTodolist: (todolistId: string) => ({
        type: TypesOfTodolistsActions.REMOVE_TODOLIST as const,
        todolistId,
    }),
    addTodolist: (todolist: TodolistType) => ({
        type: TypesOfTodolistsActions.ADD_TODOLIST as const,
        todolist,
    }),
    changeTodolistTitle: (newTitle: string, todolistId: string) => ({
        type: TypesOfTodolistsActions.CHANGE_TODOLIST_TITLE as const,
        newTitle,
        todolistId,
    }),
    changeTodolistFilter: (filter: FilterType, todolistId: string) => ({
        type: TypesOfTodolistsActions.CHANGE_TODOLIST_FILTER as const,
        filter,
        todolistId,
    }),
    setTodolists: (todolists: TodolistType[]) => ({
        type: TypesOfTodolistsActions.SET_TODOLISTS as const,
        todolists,
    }),
    changeTodolistEntityStatus: (todolistId: string, entityStatus: RequestStatusType) => ({
        type: TypesOfTodolistsActions.CHANGE_TODOLIST_ENTITY_STATUS as const,
        todolistId,
        entityStatus,
    }),
};

// thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(appActions.setLoadingStatus("loading"));
        const { data } = await Api.getTodolists();
        dispatch(todolistsActions.setTodolists(data));
        dispatch(appActions.setLoadingStatus("succeeded"));
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
};

export const removeTodolistTC =
    (todolistId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(appActions.setLoadingStatus("loading"));
            dispatch(todolistsActions.changeTodolistEntityStatus(todolistId, "loading"));
            const { data } = await Api.deleteTodolist(todolistId);
            if (data.resultCode === 0) {
                dispatch(todolistsActions.removeTodolist(todolistId));
                dispatch(appActions.setLoadingStatus("succeeded"));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
            dispatch(todolistsActions.changeTodolistEntityStatus(todolistId, "idle"));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const addTodolistTC =
    (title: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(appActions.setLoadingStatus("loading"));
            const { data } = await Api.createTodolist(title);
            if (data.resultCode === 0) {
                dispatch(todolistsActions.addTodolist(data.data.item));
                dispatch(appActions.setLoadingStatus("succeeded"));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };

export const changeTodolistTitleTC =
    (newTitle: string, todolistId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(appActions.setLoadingStatus("loading"));
            const { data } = await Api.updateTodolist(todolistId, newTitle);
            if (data.resultCode === 0) {
                dispatch(todolistsActions.changeTodolistTitle(newTitle, todolistId));
                dispatch(appActions.setLoadingStatus("succeeded"));
            } else {
                handleServerAppError(data.messages, dispatch);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        }
    };
