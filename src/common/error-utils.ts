import { Dispatch } from "redux";
import { AppActionsTypes, setError, setLoadingStatus } from "../state/app/app-reducer";

export const handleServerAppError = (messages: string[], dispatch: Dispatch<AppActionsTypes>) => {
    if (messages.length) {
        dispatch(setError({ error: messages[0] }));
    } else {
        dispatch(setError({ error: "Some error occurred" }));
    }
    dispatch(setLoadingStatus({ status: "failed" }));
};

export const handleServerNetworkError = (
    error: Error | unknown,
    dispatch: Dispatch<AppActionsTypes>
) => {
    if (error instanceof Error) {
        dispatch(setError({ error: error.message }));
        dispatch(setLoadingStatus({ status: "failed" }));
    }
};
