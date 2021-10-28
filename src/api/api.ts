import axios from "axios";

// ----- common types -----
type ResponseType<T> = {
    resultCode: number;
    messages: Array<string>;
    data: T;
    fieldsErrors: string[];
};
// --------------------

// ----- Todolists types -----
export type TodolistsType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
// --------------------

// ----- Tasks types -----
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    addedDate: string;
    deadline: null | string;
    description: null | string;
    id: string;
    order: number;
    priority: number;
    startDate: null | string;
    status: number;
    title: string;
    todoListId: string;
};
type GetTasksType = {
    error: string | null;
    items: TaskType[];
    totalCount: number;
};
export type UpdateTaskModelType = {
    title: string;
    description: string | null;
    status: number;
    priority: number;
    startDate: string | null;
    deadline: string | null;
};
// --------------------

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    withCredentials: true,
    headers: {
        "API-KEY": "f6d122c0-e13a-41a0-8a89-732f8ec98129",
    },
});

export const todolistsAPI = {
    async getTodolists(): Promise<TodolistsType[]> {
        const res = await instance.get<TodolistsType[]>(``);
        return res.data;
    },
    async createTodolist(title: string) {
        const res = await instance.post<ResponseType<{ item: TodolistsType }>>(
            ``,
            { title }
        );
        return res.data;
    },
    async deleteTodolist(todolistId: string): Promise<ResponseType<{}>> {
        const res = await instance.delete<ResponseType<{}>>(`${todolistId}`);
        return res.data;
    },
    async updateTodolist(
        todolistId: string,
        title: string
    ): Promise<ResponseType<{}>> {
        const res = await instance.put<ResponseType<{}>>(`${todolistId}`, {
            title,
        });
        return res.data;
    },
};

export const tasksAPI = {
    async getTasks(todolistId: string): Promise<GetTasksType> {
        const res = await instance.get<GetTasksType>(`${todolistId}/tasks`);
        return res.data;
    },
    async createTask(
        todolistId: string,
        title: string
    ): Promise<ResponseType<{ item: TaskType }>> {
        const res = await instance.post<ResponseType<{ item: TaskType }>>(
            `${todolistId}/tasks`,
            { title }
        );
        return res.data;
    },
    async deleteTask(
        todolistId: string,
        taskId: string
    ): Promise<ResponseType<{}>> {
        const res = await instance.delete<ResponseType<{}>>(
            `${todolistId}/tasks/${taskId}`
        );
        return res.data;
    },
    async updateTask(
        todolistId: string,
        taskId: string,
        model: UpdateTaskModelType
    ): Promise<ResponseType<{ item: TaskType }>> {
        const res = await instance.put<ResponseType<{ item: TaskType }>>(
            `${todolistId}/tasks/${taskId}`,
            model
        );
        return res.data;
    },
};
