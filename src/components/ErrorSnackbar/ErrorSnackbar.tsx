import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";

import { getAppError } from "../../state/app/app-selectors";
import { useActions } from "../../hooks/useActions";
import { appActions } from "../../state/app";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar: React.FC = React.memo(() => {
    const { setError } = useActions(appActions);
    const error = useSelector(getAppError);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setError({ error: null });
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
