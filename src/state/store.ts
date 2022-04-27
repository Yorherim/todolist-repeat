import { TasksActionsTypes, tasksReducer } from "./tasks/tasks-reducer";
import { TodolistsActionsTypes, todolistsReducer } from "./todolists/todolists-reducer";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk, { ThunkAction } from "redux-thunk";
import { AppActionsTypes, appReducer, initializeAppSaga } from "./app/app-reducer";
import { AuthActionsTypes, authReducer } from "./auth/authReducer";
import { put, takeEvery } from "redux-saga/effects";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
});
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
    yield takeEvery("INITIALIZE_APP", initializeAppSaga);
}
