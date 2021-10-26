import React, { ChangeEvent, useState } from "react";

import { TextField } from "@mui/material";

import "./EditableSpan.module.scss";

type EditableSpanPropsType = {
    title: string;
    onChangeTitle: (newValue: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(
    ({ title, onChangeTitle }) => {
        console.log("EditableSpan render");
        const [editMode, setEditMode] = useState<boolean>(false);
        const [stateTitle, setStateTitle] = useState("");

        const activateEditMode = () => {
            setEditMode(true);
            setStateTitle(title);
        };

        const deactivateEditMode = () => setEditMode(false);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setStateTitle(e.currentTarget.value);
            onChangeTitle(e.currentTarget.value);
        };

        return editMode ? (
            <TextField
                value={stateTitle}
                size="small"
                onBlur={deactivateEditMode}
                onChange={onChangeHandler}
                autoFocus
            />
        ) : (
            <span onDoubleClick={activateEditMode} data-testid="span-element">
                {title}
            </span>
        );
    }
);
