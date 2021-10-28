import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../api/api";

import { tasksActions, tasksReducer, TaskStateType } from "./tasks-reducer";
import { todolistsActions } from "./todolists-reducer";

const todolistId1 = v1();
const todolistId2 = v1();
let startState: TaskStateType;
let taskId: string;

const { addTask, removeTask, changeCheckStatus, changeTaskTitle, setTasks } =
    tasksActions;

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "1",
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "2",
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "3",
            },
        ],
        [todolistId2]: [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "1",
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "2",
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "3",
            },
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
        expect(endState[todolistId2] !== startState[todolistId2]).toBeTruthy();
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
        expect(endState[todolistId1] !== startState[todolistId1]).toBeTruthy();
    });

    it("correct task should be changed checkbox", () => {
        const endState = tasksReducer(
            startState,
            changeCheckStatus(taskId, todolistId1)
        );
        expect(endState[todolistId1][0].status).toBe(TaskStatuses.Completed);
        expect(
            endState[todolistId1][0] !== startState[todolistId1][0]
        ).toBeTruthy();

        const endState1 = tasksReducer(
            endState,
            changeCheckStatus(taskId, todolistId1)
        );
        expect(endState1[todolistId1][0].status).toBe(TaskStatuses.New);
        expect(
            endState1[todolistId1][0] !== startState[todolistId1][0]
        ).toBeTruthy();
    });

    it("correct task title should be changed", () => {
        const endState = tasksReducer(
            startState,
            changeTaskTitle(taskId, todolistId1, "new title task")
        );

        expect(endState[todolistId1][0].title).toBe("new title task");
        expect(
            endState[todolistId1][0] !== startState[todolistId1][0]
        ).toBeTruthy();
    });

    it("tasks should be set", () => {
        const startState1 = {
            [todolistId1]: [],
            [todolistId2]: [],
        };
        const endState = tasksReducer(
            startState1,
            setTasks(
                [startState[todolistId1][0], startState[todolistId1][1]],
                todolistId1
            )
        );

        expect(endState[todolistId1][0].title).toBe(
            startState[todolistId1][0].title
        );
        expect(endState[todolistId1][1].title).toBe(
            startState[todolistId1][1].title
        );
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

    it("empty arrays of tasks should be added when we set todolists", () => {
        const action = todolistsActions.setTodolists([
            { id: "1", title: "title 1", order: 0, addedDate: "" },
            { id: "2", title: "title 2", order: 0, addedDate: "" },
        ]);

        const endState = tasksReducer({}, action);
        const keys = Object.keys(endState);

        expect(keys).toHaveLength(2);
        expect(endState[1]).toEqual([]);
        expect(endState[2]).toEqual([]);
    });
});
