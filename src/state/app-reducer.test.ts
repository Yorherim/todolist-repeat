import { appActions, AppDomainType, appReducer } from "./app-reducer";

let startState: AppDomainType;

const { setError, setStatus } = appActions;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
    };
});

test("correct error message should be set", () => {
    const endState = appReducer(startState, setError("some error"));

    expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
    const endState = appReducer(startState, setStatus("loading"));

    expect(endState.status).toBe("loading");
});
