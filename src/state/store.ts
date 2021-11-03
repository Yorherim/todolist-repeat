import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import { TodolistsActionsTypes, todolistsReducer } from "./todolists-reducer";
import { TasksActionsTypes, tasksReducer } from "./tasks-reducer";
import { AppActionsType, appReducer } from "./app-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType =
    | TodolistsActionsTypes
    | TasksActionsTypes
    | AppActionsType;
export type ThunkType = ThunkAction<
    void,
    AppRootStateType,
    unknown,
    AppRootActionsType
>;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);
