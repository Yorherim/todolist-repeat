import { Dispatch } from "redux";
import Api, { TodolistType } from "../api/api";

export enum TypesOfTodolistsActions {
    ADD_TODOLIST = "ADD_TODOLIST",
    REMOVE_TODOLIST = "REMOVE_TODOLIST",
    CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE",
    CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER",
    SET_TODOLISTS = "SET_TODOLISTS",
}

export type FilterType = "all" | "active" | "completed";
export type TodolistStateType = TodolistType & {
    filter: FilterType;
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
            }));
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
};

// thunks
export const fetchTodolistsTC = () => async (dispatch: Dispatch<TodolistsActionsTypes>) => {
    const { data } = await Api.getTodolists();
    dispatch(todolistsActions.setTodolists(data));
};
export const removeTodolistTC =
    (todolistId: string) => async (dispatch: Dispatch<TodolistsActionsTypes>) => {
        const { data } = await Api.deleteTodolist(todolistId);
        if (data.resultCode === 0) {
            dispatch(todolistsActions.removeTodolist(todolistId));
        }
    };
export const addTodolistTC =
    (title: string) => async (dispatch: Dispatch<TodolistsActionsTypes>) => {
        const { data } = await Api.createTodolist(title);
        if (data.resultCode === 0) {
            dispatch(todolistsActions.addTodolist(data.data.item));
        }
    };
export const changeTodolistTitleTC =
    (newTitle: string, todolistId: string) => async (dispatch: Dispatch<TodolistsActionsTypes>) => {
        const { data } = await Api.updateTodolist(todolistId, newTitle);
        if (data.resultCode === 0) {
            dispatch(todolistsActions.changeTodolistTitle(newTitle, todolistId));
        }
    };
