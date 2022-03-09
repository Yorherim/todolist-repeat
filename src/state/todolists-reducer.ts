import { v1 } from "uuid";

export enum TypesOfTodolistsActions {
    ADD_TODOLIST = "ADD_TODOLIST",
    REMOVE_TODOLIST = "REMOVE_TODOLIST",
    CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE",
    CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER",
}

export type FilterType = "all" | "active" | "completed";
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistsActionsTypes = ReturnType<
    InferValueTypes<typeof todolistsActions>
>;

const initialState = [] as TodolistType[];

export const todolistsReducer = (
    state: TodolistType[] = initialState,
    action: TodolistsActionsTypes
): TodolistType[] => {
    switch (action.type) {
        case TypesOfTodolistsActions.REMOVE_TODOLIST:
            return state.filter((td) => td.id !== action.todolistId);
        case TypesOfTodolistsActions.ADD_TODOLIST:
            return state.concat({
                id: action.todolistId,
                title: action.title,
                filter: "all",
            });
        case TypesOfTodolistsActions.CHANGE_TODOLIST_TITLE:
            return state.map((td) =>
                td.id === action.todolistId
                    ? { ...td, title: action.newTitle }
                    : td
            );
        case TypesOfTodolistsActions.CHANGE_TODOLIST_FILTER:
            return state.map((td) =>
                td.id === action.todolistId
                    ? { ...td, filter: action.filter }
                    : td
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
    addTodolist: (title: string) => ({
        type: TypesOfTodolistsActions.ADD_TODOLIST as const,
        title,
        todolistId: v1(),
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
};
