import { Provider } from "react-redux";
import { PartialStoryFn } from "@storybook/csf";
import { ReactFramework } from "@storybook/react";
import { v1 } from "uuid";
import { combineReducers, createStore } from "redux";

import { AppRootStateType } from "../state/store";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";
import { TaskPriorities, TaskStatus } from "../api/api";

export const todolistId1 = v1();
export const todolistId2 = v1();

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
                id: v1(),
                title: "HTML&CSS",
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
            {
                id: v1(),
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
                id: v1(),
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
                id: v1(),
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
    },
};

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
});

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (
    story: PartialStoryFn<
        ReactFramework,
        {
            children?: React.ReactNode;
        }
    >
) => <Provider store={storyBookStore}>{story()}</Provider>;
