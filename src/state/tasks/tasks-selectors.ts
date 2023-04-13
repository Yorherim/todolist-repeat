import { AppRootStateType } from "../store";

export const getTasksByTodolistId = (todolistId: string) => (state: AppRootStateType) => {
    return state.tasks[todolistId];
}

