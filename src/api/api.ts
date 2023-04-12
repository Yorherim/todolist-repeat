import axios from "axios";

export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};
export type TodolistResponseType<D> = {
    resultCode: number;
    messages: string[];
    fieldsErrors: string[];
    data: D;
};
type DeleteTodolistResponseType<D> = Omit<TodolistResponseType<D>, "fieldsErrors">;

export enum TaskStatus {
    New,
    InProgress,
    Completed,
    Draft,
}
export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later,
}
export type TaskType = {
    description: string | null;
    title: string;
    completed: boolean;
    status: TaskStatus;
    priority: TaskPriorities;
    startDate: string | null;
    deadline: string | null;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
type GetTasksResponseType = {
    items: TaskType[];
    totalCount: number;
    error: string;
};
type TaskResponseType<D> = {
    resultCode: number;
    messages: string[];
    data: D;
};
export type UpdateTaskData = Pick<
    TaskType,
    "description" | "title" | "completed" | "status" | "priority" | "startDate" | "deadline"
>;

type LoginResponseType = {
    resultCode: number;
    fieldsErrors: string[];
    messages: string[];
    data: {
        userId: number;
    };
};
type LogoutResponseType = {
    resultCode: number;
    messages: string[];
    data: {};
};
type AuthMeResponseType = {
    resultCode: number;
    messages: string[];
    data: {
        id: number;
        email: string;
        login: string;
    };
};
export type AuthData = {
    email: string;
    password: string;
    rememberMe?: boolean;
    captcha?: boolean;
};

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "58a993db-1dec-4e5e-aeb2-a54bfae69c2c",
        //"API-KEY": "8074858c-0737-4322-ae35-ab3cabfe40b4",
    },
});

export default class Api {
    // Todolists
    static async getTodolists() {
        return await instance.get<TodolistType[]>("/todo-lists");
    }
    static async createTodolist(title: string) {
        return await instance.post<TodolistResponseType<{ item: TodolistType }>>("/todo-lists", {
            title,
        });
    }
    static async deleteTodolist(todolistId: string) {
        return await instance.delete<DeleteTodolistResponseType<{}>>(`/todo-lists/${todolistId}`);
    }
    static async updateTodolist(todolistId: string, title: string) {
        return await instance.put<TodolistResponseType<{}>>(`/todo-lists/${todolistId}`, { title });
    }

    // Tasks
    static async getTasks(todolistId: string) {
        return await instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    }
    static async createTask(todolistId: string, title: string) {
        return await instance.post<TaskResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks`,
            { title }
        );
    }
    static async updateTask(todolistId: string, taskId: string, updateData: UpdateTaskData) {
        return await instance.put<TaskResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            updateData
        );
    }
    static async deleteTask(todolistId: string, taskId: string) {
        return await instance.delete<TaskResponseType<{}>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`
        );
    }

    // Auth
    static async login({ email, password, rememberMe, captcha }: AuthData) {
        return await instance.post<LoginResponseType>(`/auth/login`, {
            email,
            password,
            rememberMe,
            captcha: captcha ? captcha : false,
        });
    }
    static async logout() {
        return await instance.delete<LogoutResponseType>(`/auth/login`);
    }
    static async authMe() {
        return await instance.get<AuthMeResponseType>(`/auth/me`);
    }
}
