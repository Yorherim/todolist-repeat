import { AuthInitialStateType, authReducer, setIsLoggedIn } from "./authReducer";

let state: AuthInitialStateType;

beforeEach(() => {
    state = {
        isLoggedIn: false,
    };
});

test("auth should change isLoggedIn", () => {
    const endState = authReducer(state, setIsLoggedIn({ value: true }));
    expect(endState.isLoggedIn).toBeTruthy();
});
