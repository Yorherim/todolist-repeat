import axios, { AxiosResponse } from "axios";

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

export type TaskType = {
    description: string;
    title: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: Date;
    deadline: Date;
    id: string;
    todoListId: string;
    order: number;
    addedDate: Date;
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
type UpdateTaskData = {
    title: string;
    description: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: Date;
    deadline: Date;
};

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
        return await instance.get<AxiosResponse<TodolistType[], any>>("/todo-lists");
    }
    static async createTodolist(title: string) {
        return await instance.post<
            AxiosResponse<TodolistResponseType<{ item: TodolistType }>, any>
        >("/todo-lists", { title });
    }
    static async deleteTodolist(todolistId: string) {
        return await instance.delete<AxiosResponse<DeleteTodolistResponseType<{}>, any>>(
            `/todo-lists/${todolistId}`
        );
    }
    // ! Протипизировать ответ
    static async updateTodolist(todolistId: string, title: string) {
        return await instance.put(`/todo-lists/${todolistId}`, { title });
    }

    // Tasks
    static async getTasks(todolistId: string) {
        return await instance.get<AxiosResponse<GetTasksResponseType, any>>(
            `/todo-lists/${todolistId}/tasks`
        );
    }
    static async createTask(todolistId: string, title: string) {
        return await instance.post<AxiosResponse<TaskResponseType<{ item: TaskType }>, any>>(
            `/todo-lists/${todolistId}/tasks`,
            { title }
        );
    }
    static async updateTask(todolistId: string, taskId: string, updateData: UpdateTaskData) {
        return await instance.put<AxiosResponse<TaskResponseType<{ item: TaskType }>, any>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            updateData
        );
    }
    static async deleteTask(todolistId: string, taskId: string) {
        return await instance.delete<AxiosResponse<TaskResponseType<{}>, any>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`
        );
    }
}
