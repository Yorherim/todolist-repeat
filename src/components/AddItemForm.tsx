import React, {
    DetailedHTMLProps,
    HTMLAttributes,
    useEffect,
    useState,
} from "react";

interface AddItemFormPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    addItem: (title: string) => void;
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({
    addItem,
    className,
}) => {
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
        <div className={className}>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                onKeyPress={(e) => onKeyPressAddTaskHandler(e.key)}
                className={error ? "error-input" : ""}
            />
            <button onClick={onClickAddItemHandler}>+</button>
            {error && <div className={"error"}>Field is required</div>}
        </div>
    );
};
