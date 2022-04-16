import * as appSelectors from "./app-selectors";
import * as appAsyncActions from "./app-actions";
import { appSlice } from "./app-slice";

const appActions = {
    ...appAsyncActions,
    setError: appSlice.actions.setError,
};

export { appSelectors, appActions };
