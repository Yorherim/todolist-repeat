import { StateType, userReducer } from "./user-reducer";

let state: StateType;

beforeEach(() => {
    state = { age: 20, childrenCount: 2, name: "Dimych" };
});

test("user reducer should increment only age", () => {
    const endState = userReducer(state, { type: "INCREMENT-AGE" });

    expect(endState.age).toBe(21);
});

test("user reducer should increment only childrenCount", () => {
    const endState = userReducer(state, { type: "INCREMENT-CHILDREN-COUNT" });

    expect(endState.childrenCount).toBe(3);
});

test("user reducer should return default state", () => {
    const endState = userReducer(state, { type: "lalala" });

    expect(endState).toEqual(state);
});

test("user reducer should change name of user", () => {
    const endState = userReducer(state, {
        type: "CHANGE-NAME",
        newName: "Viktor",
    });

    expect(endState.name).toBe("Viktor");
});
