import {
    appReducer,
    AppStateType,
    setError,
    setInitialized,
    setLoadingStatus,
} from "./app-reducer";

let state: AppStateType;

beforeEach(() => {
    state = {
        error: null,
        status: "idle",
        initialized: false,
    };
});

test("app should set correct error", () => {
    const endState = appReducer(state, setError({ error: "some error" }));
    expect(endState.error).toBe("some error");
});

test("app should set correct loading status", () => {
    const endState = appReducer(state, setLoadingStatus({ status: "loading" }));
    expect(endState.status).toBe("loading");
});

test("app should initializeded", () => {
    const endState = appReducer(state, setInitialized({ value: true }));
    expect(endState.initialized).toBe(true);
});
