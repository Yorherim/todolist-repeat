import { v1 } from "uuid";
import { todolistsAPI, TodolistsType } from "../api/api";
import { ThunkType } from "./store";
import { fetchTasksTC } from "./tasks-reducer";

export enum TODOLISTS_ACTIONS_TYPE {
    REMOVE_TODOLIST = "REMOVE-TODOLIST",
    ADD_TODOLIST = "ADD-TODOLIST",
    CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE",
    CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER",
    SET_TODOLISTS = "SET-TODOLISTS",
}

export type FilterValuesType = "all" | "active" | "completed";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistsActionsTypes = ReturnType<
    InferValueTypes<typeof todolistsActions>
>;

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType;
};

export const todolistId1 = v1();
export const todolistId2 = v1();

export const initialState: Array<TodolistsDomainType> = [];

export const todolistsReducer = (
    state: TodolistsDomainType[] = initialState,
    action: TodolistsActionsTypes
): TodolistsDomainType[] => {
    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter((tl) => tl.id !== action.payload.todolistId);
        case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST:
            return [
                ...state,
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: "all",
                    addedDate: "",
                    order: 0,
                },
            ];
        case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE: {
            return state.map((tl) =>
                tl.id === action.payload.todolistId
                    ? { ...tl, title: action.payload.newTitle }
                    : tl
            );
        }
        case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER: {
            return state.map((tl) =>
                tl.id === action.payload.todolistId
                    ? { ...tl, filter: action.payload.filterValue }
                    : tl
            );
        }
        case TODOLISTS_ACTIONS_TYPE.SET_TODOLISTS:
            return action.payload.todolists.map((tl) => ({
                ...tl,
                filter: "all",
            }));
        default:
            return state;
    }
};

export const todolistsActions = {
    removeTodolist: (todolistId: string) => ({
        type: TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST as const,
        payload: {
            todolistId,
        },
    }),
    addTodolist: (title: string) => ({
        type: TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST as const,
        payload: {
            title,
            todolistId: v1(),
        },
    }),
    changeTodolistTitle: (todolistId: string, newTitle: string) => ({
        type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE as const,
        payload: {
            todolistId,
            newTitle,
        },
    }),
    changeTodolistFilter: (
        filterValue: FilterValuesType,
        todolistId: string
    ) => ({
        type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER as const,
        payload: {
            filterValue,
            todolistId,
        },
    }),
    setTodolists: (todolists: TodolistsType[]) => ({
        type: TODOLISTS_ACTIONS_TYPE.SET_TODOLISTS as const,
        payload: {
            todolists,
        },
    }),
};

// thunk creators
export const fetchTodolistsTC = (): ThunkType => async (dispatch) => {
    try {
        const todolists = await todolistsAPI.getTodolists();
        dispatch(todolistsActions.setTodolists(todolists));

        todolists.forEach((tl) => {
            dispatch(fetchTasksTC(tl.id));
        });
    } catch (err) {
        const u = err as string;
        throw new Error(u);
    }
};
