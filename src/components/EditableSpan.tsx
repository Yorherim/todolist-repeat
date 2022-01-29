import React, { useState } from "react";

interface EditableSpanPropsType {
    value: string;
    changeItem: (newTitle: string, itemId: string) => void;
    itemId: string;
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
    value,
    changeItem,
    itemId,
}) => {
    const [valueInput, setValueInput] = useState<string>(value);
    const [editMode, setEditMode] = useState<boolean>(false);

    const changeItemValue = () => {
        setEditMode(false);
        changeItem(valueInput, itemId);
    };

    return (
        <>
            {editMode ? (
                <input
                    value={valueInput}
                    onChange={(e) => setValueInput(e.currentTarget.value)}
                    onBlur={changeItemValue}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => setEditMode(true)}>{value}</span>
            )}
        </>
    );
};
