import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";

import styles from "./AddItemForm.module.scss";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = ({ addItem }) => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
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
            setError("Title is required");
        }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemAndShowErrorHandler();
        }
    };

    return (
        <div className={styles.inputTitleTask}>
            <input
                value={newTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? styles.error : ""}
                placeholder={"Введите что-нибудь..."}
            />
            <button onClick={addItemAndShowErrorHandler}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};
