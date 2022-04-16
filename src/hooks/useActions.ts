import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { AppDispatchType } from "../state/store";

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useDispatch<AppDispatchType>();

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, [actions, dispatch]);

    return boundActions;
};
