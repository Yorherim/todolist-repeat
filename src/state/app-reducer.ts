enum APP_ACTIONS_TYPE {
    SET_STATUS = "SET-STATUS",
    SET_ERROR = "SET-ERROR",
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppDomainType = {
    status: RequestStatusType;
    error: string | null;
};
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionsType = ReturnType<InferValueTypes<typeof appActions>>;

const initialState: AppDomainType = {
    status: "idle",
    error: null,
};

export const appReducer = (
    state = initialState,
    action: AppActionsType
): AppDomainType => {
    switch (action.type) {
        case APP_ACTIONS_TYPE.SET_STATUS:
            return { ...state, status: action.status };
        case APP_ACTIONS_TYPE.SET_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export const appActions = {
    setStatus: (status: RequestStatusType) => ({
        type: APP_ACTIONS_TYPE.SET_STATUS as const,
        status,
    }),
    setError: (error: string | null) => ({
        type: APP_ACTIONS_TYPE.SET_ERROR as const,
        error,
    }),
};
