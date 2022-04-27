import { put, call, takeEvery } from "redux-saga/effects";
import Api from "../../api/api";
import { authActions } from "../auth/authReducer";
import { appActions } from "./app-reducer";

function* initializeAppSaga() {
    try {
        const { data } = yield call(Api.authMe);
        if (data.resultCode === 0) {
            yield put(authActions.setIsLoggedIn(true));
        }
        yield put(appActions.setInitialized(true));
    } catch (error) {
        console.log("попал в catch initializeAppSaga");
        // handleServerNetworkError(error, put);
        if (error instanceof Error) {
            yield put(appActions.setError(error.message));
            yield put(appActions.setLoadingStatus("failed"));
        }
    }
}
export const initializeApp = () => ({ type: "INITIALIZE_APP" });

// watcher
export function* appWatcherSaga() {
    yield takeEvery("INITIALIZE_APP", initializeAppSaga);
}
