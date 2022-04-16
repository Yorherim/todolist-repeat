import { AppRootStateType } from "../store";

export const getTasksByTodolistId = (todolistId: string) => (state: AppRootStateType) =>
    state.tasks[todolistId];
