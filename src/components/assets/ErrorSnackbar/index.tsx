import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AppRootStateType } from "../../../state/store";
import { appActions } from "../../../state/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string | null>(
        (state) => state.app.error
    );

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;

        dispatch(appActions.setError(null));
    };

    return (
        <div>
            <Snackbar
                open={error !== null}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {"error"}
                </Alert>
            </Snackbar>
        </div>
    );
}
