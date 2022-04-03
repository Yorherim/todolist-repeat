enum TypesAppActions {
    SET_STATUS = "SET_STATUS",
    SET_ERROR = "SET_ERROR",
}
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppStateType = {
    status: RequestStatusType;
    error: string | null;
};
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionsTypes = ReturnType<InferValueTypes<typeof appActions>>;

const initialState: AppStateType = {
    status: "loading",
    error: null,
};

export const appReducer = (
    state: AppStateType = initialState,
    action: AppActionsTypes
): AppStateType => {
    switch (action.type) {
        case TypesAppActions.SET_STATUS:
            return { ...state, status: action.status };
        case TypesAppActions.SET_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export const appActions = {
    setLoadingStatus: (status: RequestStatusType) => ({
        type: TypesAppActions.SET_STATUS as const,
        status,
    }),
    setError: (error: string | null) => ({
        type: TypesAppActions.SET_ERROR as const,
        error,
    }),
};
