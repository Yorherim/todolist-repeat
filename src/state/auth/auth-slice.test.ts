import { authSlice, authReducer, setIsLoggedIn } from "./auth-slice";

let state: ReturnType<typeof authSlice.getInitialState>;

beforeEach(() => {
    state = {
        isLoggedIn: false,
    };
});

test("auth should change isLoggedIn", () => {
    const endState = authReducer(state, setIsLoggedIn({ value: true }));
    expect(endState.isLoggedIn).toBeTruthy();
});
