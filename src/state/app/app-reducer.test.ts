import { appActions, appReducer, AppStateType } from "./app-reducer";

let state: AppStateType;

beforeEach(() => {
    state = {
        error: null,
        status: "idle",
    };
});

test("app should set correct error", () => {
    const endState = appReducer(state, appActions.setError("some error"));
    expect(endState.error).toBe("some error");
});

test("app should set correct loading status", () => {
    const endState = appReducer(state, appActions.setLoadingStatus("loading"));
    expect(endState.status).toBe("loading");
});
