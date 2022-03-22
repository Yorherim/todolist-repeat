import { Provider } from "react-redux";
import { PartialStoryFn } from "@storybook/csf";
import { ReactFramework } from "@storybook/react";
import { v1 } from "uuid";
import { combineReducers, createStore } from "redux";

import { AppRootStateType } from "../state/store";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";

const todolistId1 = "todolistId1";
const todolistId2 = "todolistId2";

const initialGlobalState: AppRootStateType = {
    todolists: [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ],
    tasks: {
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: false },
            { id: v1(), title: "React Book", isDone: true },
        ],
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
