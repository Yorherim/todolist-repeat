import { Provider } from "react-redux";
import { PartialStoryFn } from "@storybook/csf";
import { ReactFramework } from "@storybook/react";
import { nanoid } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, createStore } from "redux";

import { AppRootStateType } from "../state/store";
import { tasksReducer } from "../state/tasks/tasks-reducer";
import { todolistsReducer } from "../state/todolists/todolists-reducer";
import { TaskPriorities, TaskStatus } from "../api/api";
import { appReducer } from "../state/app/app-reducer";
import thunk from "redux-thunk";

export const todolistId1 = nanoid();
export const todolistId2 = nanoid();

const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle",
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle",
        },
    ],
    tasks: {
        [todolistId1]: [
            {
                id: nanoid(),
                title: "HTML&CSS",
                status: TaskStatus.Completed,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId1,
                entityStatus: "idle",
            },
            {
                id: nanoid(),
                title: "JS",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId1,
                entityStatus: "idle",
            },
        ],
        [todolistId2]: [
            {
                id: nanoid(),
                title: "Milk",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId2,
                entityStatus: "idle",
            },
            {
                id: nanoid(),
                title: "React Book",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId2,
                entityStatus: "idle",
            },
        ],
    },
    app: {
        status: "idle",
        error: null,
        initialized: false,
    },
    auth: { isLoggedIn: false },
};

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
});

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (
    story: PartialStoryFn<
        ReactFramework,
        {
            children?: React.ReactNode;
        }
    >
) => <Provider store={storyBookStore}>{story()}</Provider>;
