import { tasksReducer } from "./tasks/tasks-reducer";
import { todolistsReducer } from "./todolists/todolists-reducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { appReducer } from "./app/app-reducer";
import { authReducer } from "./auth/authReducer";

export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;

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
