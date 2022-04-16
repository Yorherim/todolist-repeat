import { initializeAppTC } from "./app-actions";
import { appReducer, AppStateType, setError, setLoadingStatus } from "./app-slice";

let state: AppStateType;

beforeEach(() => {
    state = {
        error: null,
        loadingStatus: "idle",
        initialized: false,
    };
});

test("app should set correct error", () => {
    const endState = appReducer(state, setError({ error: "some error" }));
    expect(endState.error).toBe("some error");
});

test("app should set correct loading status", () => {
    const endState = appReducer(state, setLoadingStatus({ status: "loading" }));
    expect(endState.loadingStatus).toBe("loading");
});

test("app should initializeded", () => {
    const endState = appReducer(state, initializeAppTC.fulfilled(undefined, ""));
    expect(endState.initialized).toBe(true);
});
