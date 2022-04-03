import { TextField } from "@mui/material";
import React, { useState } from "react";

import styles from "./EditableSpan.module.scss";

interface EditableSpanPropsType {
    value: string;
    changeItem: (newTitle: string, itemId: string) => void;
    itemId: string;
    disabled: boolean;
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(function ({
    value,
    changeItem,
    itemId,
    disabled,
}) {
    const [valueInput, setValueInput] = useState<string>(value);
    const [editMode, setEditMode] = useState<boolean>(false);

    const changeItemValue = () => {
        setEditMode(false);
        changeItem(valueInput, itemId);
    };

    const enableEditMode = () => {
        if (!disabled) {
            setEditMode(true);
        }
    };

    return (
        <div className={styles.wrapper}>
            {editMode ? (
                <TextField
                    label="Write some..."
                    variant="outlined"
                    value={valueInput}
                    onChange={(e) => setValueInput(e.currentTarget.value)}
                    onBlur={changeItemValue}
                    multiline
                    inputProps={{ maxLength: 100 }}
                    disabled={disabled}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={enableEditMode}>{value}</span>
            )}
        </div>
    );
});
