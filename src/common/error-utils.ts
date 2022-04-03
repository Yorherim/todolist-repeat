import { Dispatch } from "redux";
import { appActions, AppActionsTypes } from "../state/app/app-reducer";

export const handleServerAppError = (messages: string[], dispatch: Dispatch<AppActionsTypes>) => {
    if (messages.length) {
        dispatch(appActions.setError(messages[0]));
    } else {
        dispatch(appActions.setError("Some error occurred"));
    }
    dispatch(appActions.setLoadingStatus("failed"));
};

export const handleServerNetworkError = (
    error: Error | unknown,
    dispatch: Dispatch<AppActionsTypes>
) => {
    if (error instanceof Error) {
        dispatch(appActions.setError(error.message));
        dispatch(appActions.setLoadingStatus("failed"));
    }
};
