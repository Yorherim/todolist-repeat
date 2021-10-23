import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";

import { IconButton, TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";

import styles from "./AddItemForm.module.scss";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
    placeholder?: string;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = ({
    addItem,
    placeholder,
}) => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [error]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };

    const addItemAndShowErrorHandler = () => {
        if (newTitle.trim() !== "") {
            addItem(newTitle);
            setNewTitle("");
        } else {
            setError(true);
        }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemAndShowErrorHandler();
        }
    };

    return (
        <div className={styles.inputTitleTask}>
            <TextField
                id="outlined-basic"
                label={placeholder ? placeholder : "Writing some..."}
                variant={"outlined"}
                error={error}
                value={newTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error && "Title is empty"}
            />
            <IconButton
                style={{ padding: "16px" }}
                aria-label="delete"
                onClick={addItemAndShowErrorHandler}
                color={"primary"}
                data-testid={
                    placeholder === "Введите название тудулиста"
                        ? "btn-todolist"
                        : ""
                }
            >
                <ControlPoint />
            </IconButton>
        </div>
    );
};
