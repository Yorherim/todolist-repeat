import { TasksActionsTypes, tasksReducer } from "./tasks/tasks-reducer";
import { TodolistsActionsTypes, todolistsReducer } from "./todolists/todolists-reducer";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { AppActionsTypes, appReducer } from "./app/app-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
export type AppRootStateType = ReturnType<typeof rootReducer>;
type AppRootActionsType = TasksActionsTypes | TodolistsActionsTypes | AppActionsTypes;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppRootActionsType
>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
