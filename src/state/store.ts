import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import { TodolistsActionsTypes, todolistsReducer } from "./todolists-reducer";
import { TasksActionsTypes, tasksReducer } from "./tasks-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = TodolistsActionsTypes | TasksActionsTypes;
export type ThunkType = ThunkAction<
    void,
    AppStateType,
    unknown,
    AppActionsType
>;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);
