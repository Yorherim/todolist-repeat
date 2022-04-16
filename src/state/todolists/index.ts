import * as todolistsSelectors from "./todolists-selectors";
import * as todolistsAsyncActions from "./todolists-actions";
import { todolistsSlice } from "./todolists-slice";

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions,
};

export { todolistsSelectors, todolistsActions };
