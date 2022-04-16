import { Dispatch } from "redux";
import { setError, setLoadingStatus } from "../state/app/app-slice";

export const handleServerAppError = (messages: string[], dispatch: Dispatch) => {
    if (messages.length) {
        dispatch(setError({ error: messages[0] }));
    } else {
        dispatch(setError({ error: "Some error occurred" }));
    }
    dispatch(setLoadingStatus({ status: "failed" }));
};

export const handleServerNetworkError = (error: Error | unknown, dispatch: Dispatch) => {
    if (error instanceof Error) {
        dispatch(setError({ error: error.message }));
        dispatch(setLoadingStatus({ status: "failed" }));
    }
};
