import { v1 } from "uuid";
import { tasksActions, tasksReducer, TasksType } from "./tasks-reducer";

let todolistId1: string;
let todolistId2: string;
let taskId1: string;
let taskId2: string;
let taskId3: string;
let taskId4: string;
let state: TasksType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    taskId1 = v1();
    taskId2 = v1();
    taskId3 = v1();
    taskId4 = v1();
    state = {
        [todolistId1]: [
            { id: taskId1, title: "a", isDone: false },
            { id: taskId2, title: "b", isDone: false },
        ],
        [todolistId2]: [
            { id: taskId3, title: "c", isDone: false },
            { id: taskId4, title: "d", isDone: false },
        ],
    };
});

test("correct task should be removed", () => {
    const endState = tasksReducer(
        state,
        tasksActions.removeTask(taskId1, todolistId1)
    );

    expect(endState[todolistId1]).toHaveLength(1);
    expect(endState[todolistId2]).toHaveLength(2);
    expect(endState[todolistId1][0].title).toBe("b");
    expect(endState[todolistId1][0].id).toBe(taskId2);
});

test("correct task should be added", () => {
    const endState = tasksReducer(
        state,
        tasksActions.addTask("new task", todolistId1)
    );

    expect(endState[todolistId1]).toHaveLength(3);
    expect(endState[todolistId2]).toHaveLength(2);
    expect(endState[todolistId1][2].title).toBe("new task");
});

test("correct task should be changed title", () => {
    const endState = tasksReducer(
        state,
        tasksActions.changeTaskTitle("update task title", taskId1, todolistId1)
    );

    expect(endState[todolistId1][0].title).toBe("update task title");
    expect(endState[todolistId1][1].title).toBe("b");
});

test("correct task should be changed status", () => {
    const endState = tasksReducer(
        state,
        tasksActions.changeTaskStatus(taskId1, todolistId1)
    );

    expect(endState[todolistId1][0].isDone).toBeTruthy();
    expect(endState[todolistId1][1].isDone).toBeFalsy();
});
