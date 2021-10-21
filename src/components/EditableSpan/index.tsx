import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string;
    onChangeTitle: (newValue: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
    title,
    onChangeTitle,
}) => {
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
        <input
            value={stateTitle}
            onBlur={deactivateEditMode}
            onChange={onChangeHandler}
        />
    ) : (
        <span onDoubleClick={activateEditMode}>{title}</span>
    );
};
