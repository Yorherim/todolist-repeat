import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

import { AppRootStateType } from "../../state/store";
import { setError } from "../../state/app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string | null>((state) => state.app.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        dispatch(setError({ error: null }));
    };

    return (
        <Snackbar
            open={error !== null}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert severity="error" onClose={handleClose}>
                {error}
            </Alert>
        </Snackbar>
    );
});
