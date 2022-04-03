import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";

import styles from "./AddItemForm.module.scss";
import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import clsx from "clsx";

interface AddItemFormPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    addItem: (title: string) => void;
    disabled?: boolean;
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(function ({
    addItem,
    disabled,
    className,
}) {
    console.log("AddItemForm called");

    const [inputValue, setInputValue] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }, [error]);

    const onClickAddItemHandler = () => {
        if (inputValue.trim() !== "") {
            addItem(inputValue.trim());
            setInputValue("");
        } else {
            setError(true);
        }
    };

    const onKeyPressAddTaskHandler = (key: string) => {
        if (key === "Enter") {
            onClickAddItemHandler();
        }
    };

    return (
        <div className={clsx(className, styles.input)}>
            <TextField
                label="Write some..."
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                onKeyPress={(e) => onKeyPressAddTaskHandler(e.key)}
                error={error}
                helperText={error && "Field is required"}
                inputProps={{ maxLength: 30 }}
                disabled={disabled}
            />

            <Button onClick={onClickAddItemHandler} className={styles.button} variant={"contained"}>
                <Add />
            </Button>
        </div>
    );
});
