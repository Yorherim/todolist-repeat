import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { AddItemForm } from "./";

// props
const addItem = jest.fn();

describe("AddItemForm component", () => {
    it("AddItemForm should render", () => {
        const { getByRole } = render(<AddItemForm addItem={addItem} />);

        expect(getByRole("textbox")).toBeInTheDocument();
        expect(getByRole("button", { name: "+" })).toBeInTheDocument();
    });

    describe("snapshots", () => {
        it("snapshot component", () => {
            const component = render(<AddItemForm addItem={addItem} />);

            expect(component).toMatchSnapshot();
        });

        it("snapshot component with error", () => {
            const component = render(<AddItemForm addItem={addItem} />);
            const btn = screen.getByRole("button", { name: "+" });

            fireEvent.click(btn);

            expect(component).toMatchSnapshot();
        });
    });

    it("AddItem works", () => {
        const { getByPlaceholderText, getByRole } = render(
            <AddItemForm addItem={addItem} />
        );

        const input = getByPlaceholderText(
            "Введите что-нибудь..."
        ) as HTMLInputElement;
        fireEvent.change(input, { target: { value: "$23.0" } });

        const btn = getByRole("button", { name: "+" });
        fireEvent.click(btn);

        expect(addItem).toHaveBeenCalledTimes(1);
    });

    describe("Input", () => {
        it("input change", () => {
            const { getByPlaceholderText } = render(
                <AddItemForm addItem={addItem} />
            );

            const input = getByPlaceholderText(
                "Введите что-нибудь..."
            ) as HTMLInputElement;
            fireEvent.change(input, { target: { value: "$23.0" } });

            expect(input.value).toBe("$23.0");
        });

        it("clear input", () => {
            const { getByPlaceholderText, getByRole } = render(
                <AddItemForm addItem={addItem} />
            );

            const btn = getByRole("button", { name: "+" });
            const input = getByPlaceholderText(
                "Введите что-нибудь..."
            ) as HTMLInputElement;

            fireEvent.change(input, { target: { value: "$23.0" } });
            expect(input.value).toBe("$23.0");
            fireEvent.click(btn);
            expect(input.value).toBe("");
        });
    });

    describe("Error", () => {
        it("show error", () => {
            const { getByRole, queryByText } = render(
                <AddItemForm addItem={addItem} />
            );

            const btn = getByRole("button", { name: "+" });

            expect(queryByText("Title is required")).toBeNull();

            fireEvent.click(btn);
            expect(queryByText("Title is required")).toBeInTheDocument();
        });

        it("error disappears after a while", async () => {
            const { getByRole, queryByText } = render(
                <AddItemForm addItem={addItem} />
            );

            const btn = getByRole("button", { name: "+" });

            expect(queryByText("Title is required")).toBeNull();

            fireEvent.click(btn);
            expect(queryByText("Title is required")).toBeInTheDocument();

            await act(async () => {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        expect(queryByText("Title is required")).toBeNull();
                        resolve();
                    }, 2500);
                });
            });
        });

        it("input change className when error", () => {
            const { getByRole } = render(<AddItemForm addItem={addItem} />);

            const input = getByRole("textbox") as HTMLInputElement;
            const btn = getByRole("button", { name: "+" });

            fireEvent.click(btn);
            expect(input).toHaveClass("error");
        });
    });
});
