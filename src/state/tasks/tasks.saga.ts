import { AppRootStateType } from "./../store";
import { AxiosResponse } from "axios";
import { put, call, takeEvery, select } from "redux-saga/effects";
import Api, { GetTasksResponseType } from "../../api/api";
import { handleServerAppError, handleServerNetworkError } from "../../common/error-utils";
import { appActions } from "../app/app-reducer";
import { todolistsActions } from "../todolists/todolists-reducer";
import { tasksActions, TaskStateType, UpdateDataType } from "./tasks-reducer";

function* fetchTasksSaga(action: ReturnType<typeof fetchTasks>) {
    try {
        yield put(appActions.setLoadingStatus("loading"));
        const {
            data: { items },
        }: AxiosResponse<GetTasksResponseType> = yield call(Api.getTasks, action.todolistId);
        yield put(tasksActions.setTasks(items, action.todolistId));
        yield put(appActions.setLoadingStatus("succeeded"));
    } catch (error) {
        handleServerNetworkError(error, put);
    }
}
export const fetchTasks = (todolistId: string) => ({ type: "TASKS/FETCH_TASKS", todolistId });

function* deleteTaskSaga({ taskId, todolistId }: ReturnType<typeof deleteTask>) {
    try {
        yield put(appActions.setLoadingStatus("loading"));
        yield put(tasksActions.changeTaskEntityStatus(taskId, todolistId, "loading"));
        yield Api.deleteTask(todolistId, taskId);
        yield put(tasksActions.removeTask(taskId, todolistId));
        yield put(appActions.setLoadingStatus("succeeded"));
        yield put(tasksActions.changeTaskEntityStatus(taskId, todolistId, "idle"));
    } catch (error) {
        handleServerNetworkError(error, put);
        yield put(tasksActions.changeTaskEntityStatus(taskId, todolistId, "failed"));
    }
}
export const deleteTask = (taskId: string, todolistId: string) => ({
    type: "TASKS/DELETE_TASK",
    taskId,
    todolistId,
});

export function* addTaskSaga(action: ReturnType<typeof addTaskActionActivator>) {
    try {
        yield put(appActions.setLoadingStatus("loading"));
        yield put(todolistsActions.changeTodolistEntityStatus(action.todolistId, "loading"));
        const { data } = yield call(Api.createTask, action.todolistId, action.title);
        if (data.resultCode === 0) {
            yield put(tasksActions.addTask(action.todolistId, data.data.item));
            yield put(appActions.setLoadingStatus("succeeded"));
        } else {
            // handleServerAppError(data.messages, yield put);
        }
        yield put(todolistsActions.changeTodolistEntityStatus(action.todolistId, "idle"));
    } catch (error) {
        handleServerNetworkError(error, yield put);
    }
}
export const addTaskActionActivator = (todolistId: string, title: string) => ({
    type: "TASKS/ADD-TASK",
    todolistId,
    title,
});

export function* updateTaskSaga({ taskId, todolistId, updateData }: ReturnType<typeof updateTask>) {
    try {
        yield put(appActions.setLoadingStatus("loading"));
        yield put(tasksActions.changeTaskEntityStatus(taskId, todolistId, "loading"));
        const tasksTodolist: TaskStateType[] = yield select(
            (state: AppRootStateType) => state.tasks[todolistId]
        );
        const task = tasksTodolist.find((t) => {
            return t.id === taskId;
        });

        if (task) {
            yield call(Api.updateTask, todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                completed: task.completed,
                status: task.status,
                ...updateData,
            });
            yield put(tasksActions.updateTask(taskId, todolistId, updateData));
        }
        yield put(appActions.setLoadingStatus("succeeded"));
        yield put(tasksActions.changeTaskEntityStatus(taskId, todolistId, "idle"));
    } catch (error) {
        if (error instanceof Error) {
            yield put(appActions.setError(error.message));
            yield put(appActions.setLoadingStatus("failed"));
        }
        yield put(tasksActions.changeTaskEntityStatus(taskId, todolistId, "failed"));
    }
}
export const updateTask = (taskId: string, todolistId: string, updateData: UpdateDataType) => ({
    type: "TASKS/UPDATE-TASK",
    taskId,
    todolistId,
    updateData,
});

// watcher
export function* tasksWatcherSaga() {
    yield takeEvery("TASKS/FETCH_TASKS", fetchTasksSaga);
    yield takeEvery("TASKS/DELETE_TASK", deleteTaskSaga);
    yield takeEvery("TASKS/ADD-TASK", addTaskSaga);
    yield takeEvery("TASKS/UPDATE-TASK", updateTaskSaga);
}
