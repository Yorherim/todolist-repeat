import { v1 } from "uuid";

import { tasksActions, tasksReducer, TaskStateType } from "./tasks-reducer";
import { todolistsActions } from "./todolists-reducer";

const todolistId1 = v1();
const todolistId2 = v1();
let startState: TaskStateType;
let taskId: string;

const { addTask, removeTask, changeCheckStatus, changeTaskTitle } =
    tasksActions;

beforeEach(() => {
    startState = {
        [todolistId1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "React", isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "salt", isDone: false },
        ],
    };
    taskId = startState[todolistId1][0].id;
});

describe("tasks-reducer", () => {
    it("task should be added", () => {
        const endState = tasksReducer(
            startState,
            addTask("new task", todolistId2)
        );

        expect(endState[todolistId2]).toHaveLength(4);
        expect(endState[todolistId1]).toHaveLength(3);
        expect(endState[todolistId2][3].title).toBe("new task");
    });

    it("correct task should be removed", () => {
        const endState = tasksReducer(
            startState,
            removeTask(taskId, todolistId1)
        );

        expect(endState[todolistId1]).toHaveLength(2);
        expect(endState[todolistId2]).toHaveLength(3);
        expect(
            endState[todolistId1].find((task) => task.id === taskId)
        ).toBeFalsy();
    });

    it("correct task should be changed checkbox", () => {
        const endState = tasksReducer(
            startState,
            changeCheckStatus(taskId, todolistId1)
        );
        expect(endState[todolistId1][0].isDone).toBeFalsy();

        const endState1 = tasksReducer(
            endState,
            changeCheckStatus(taskId, todolistId1)
        );
        expect(endState1[todolistId1][0].isDone).toBeTruthy();
    });

    it("correct task title should be changed", () => {
        const endState = tasksReducer(
            startState,
            changeTaskTitle(taskId, todolistId1, "new title task")
        );

        expect(endState[todolistId1][0].title).toBe("new title task");
    });
});

describe("tasks-reducer with todolists-reducer", () => {
    it("empty array of tasks should be added when added new todolist", () => {
        const endState = tasksReducer(
            startState,
            todolistsActions.addTodolist("new todolist")
        );

        const keys = Object.keys(endState);
        const newKey = keys[keys.length - 1];

        expect(keys).toHaveLength(3);
        expect(endState[newKey]).toEqual([]);
    });
});
