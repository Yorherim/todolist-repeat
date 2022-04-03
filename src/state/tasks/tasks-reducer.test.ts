import { v1 } from "uuid";
import { TaskPriorities, TaskStatus } from "../../api/api";
import { tasksActions, tasksReducer, TaskStateType, TasksType } from "./tasks-reducer";

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
            {
                id: taskId1,
                title: "a",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId1,
                entityStatus: "idle",
            },
            {
                id: taskId2,
                title: "b",
                status: TaskStatus.Completed,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId1,
                entityStatus: "idle",
            },
        ],
        [todolistId2]: [
            {
                id: taskId3,
                title: "c",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId2,
                entityStatus: "idle",
            },
            {
                id: taskId4,
                title: "d",
                status: TaskStatus.New,
                addedDate: "",
                description: "",
                startDate: "",
                order: 0,
                deadline: "",
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: todolistId2,
                entityStatus: "idle",
            },
        ],
    };
});

test("correct task should be removed", () => {
    const endState = tasksReducer(state, tasksActions.removeTask(taskId1, todolistId1));

    expect(endState[todolistId1]).toHaveLength(1);
    expect(endState[todolistId2]).toHaveLength(2);
    expect(endState[todolistId1][0].title).toBe("b");
    expect(endState[todolistId1][0].id).toBe(taskId2);
});

test("correct task should be added", () => {
    const newTask: TaskStateType = {
        id: v1(),
        title: "new task",
        status: TaskStatus.New,
        addedDate: "",
        description: "",
        startDate: "",
        order: 0,
        deadline: "",
        completed: false,
        priority: TaskPriorities.Low,
        todoListId: todolistId2,
        entityStatus: "idle",
    };
    const endState = tasksReducer(state, tasksActions.addTask(todolistId1, newTask));

    expect(endState[todolistId1]).toHaveLength(3);
    expect(endState[todolistId2]).toHaveLength(2);
    expect(endState[todolistId1][0].title).toBe("new task");
});

test("correct task should be changed title", () => {
    const endState = tasksReducer(
        state,
        tasksActions.updateTask(taskId1, todolistId1, { title: "update task title" })
    );

    expect(endState[todolistId1][0].title).toBe("update task title");
    expect(endState[todolistId1][1].title).toBe("b");
});

test("correct task should be changed status", () => {
    let status = TaskStatus.New;
    const endState = tasksReducer(state, tasksActions.updateTask(taskId1, todolistId1, { status }));
    expect(endState[todolistId1][0].status).toBe(TaskStatus.New);

    status = TaskStatus.Completed;
    const endState1 = tasksReducer(
        state,
        tasksActions.updateTask(taskId2, todolistId1, { status })
    );
    expect(endState1[todolistId1][1].status).toBe(TaskStatus.Completed);
});

test("tasks should be set", () => {
    const endState = tasksReducer(
        { todolistId1: [] },
        tasksActions.setTasks(state[todolistId1], todolistId1)
    );
    expect(endState[todolistId1]).toHaveLength(2);
});

test("task should be change entity status", () => {
    const endState = tasksReducer(
        state,
        tasksActions.changeTaskEntityStatus(taskId1, todolistId1, "loading")
    );
    expect(endState[todolistId1][0].entityStatus).toBe("loading");
});
