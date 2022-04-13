import { TasksActionsTypes, tasksReducer } from "./tasks/tasks-reducer";
import { TodolistsActionsTypes, todolistsReducer } from "./todolists/todolists-reducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import { AppActionsTypes, appReducer } from "./app/app-reducer";
import { AuthActionsTypes, authReducer } from "./auth/authReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>;
type AppRootActionsType =
    | TasksActionsTypes
    | TodolistsActionsTypes
    | AppActionsTypes
    | AuthActionsTypes;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppRootActionsType
>;

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
