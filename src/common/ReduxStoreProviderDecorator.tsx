import { Provider } from "react-redux";
import { PartialStoryFn } from "@storybook/csf";
import { ReactFramework } from "@storybook/react";
import { configureStore, nanoid } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import { RootReducerType } from "../state/store";
import { tasksReducer } from "../state/tasks/tasks-reducer";
import { todolistsReducer } from "../state/todolists/todolists-reducer";
import { appReducer } from "../state/app/app-reducer";
import { authReducer } from "../state/auth/authReducer";
import { MemoryRouter } from "react-router-dom";

export const todolistId1 = nanoid();
export const todolistId2 = nanoid();

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
});

export const storyBookStore = configureStore({
    // preloadedState: initialGlobalState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export const ReduxStoreProviderDecorator = (
    story: PartialStoryFn<
        ReactFramework,
        {
            children?: React.ReactNode;
        }
    >
) => (
    <Provider store={storyBookStore}>
        <MemoryRouter>{story()}</MemoryRouter>
    </Provider>
);
