import * as tasksSelectors from "./tasks-selectors";
import * as tasksAsyncActions from "./tasks-actions";
import { tasksSlice } from "./tasks-slice";

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions,
};

export { tasksSelectors, tasksActions };
