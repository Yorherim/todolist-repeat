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

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "58a993db-1dec-4e5e-aeb2-a54bfae69c2c",
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
    // ! Протипизировать ответ
    static async updateTodolist(todolistId: string, title: string) {
        return await instance.put(`/todo-lists/${todolistId}`, { title });
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
}
