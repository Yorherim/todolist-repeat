import * as authSelectors from "./auth-selectors";
import * as authAsyncActions from "./auth-actions";
import { authSlice } from "./auth-slice";

const authActions = {
    ...authAsyncActions,
    // ...authSlice.actions,
};

export { authSelectors, authActions };
