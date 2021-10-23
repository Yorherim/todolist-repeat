import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { AddItemForm } from "./";

// props
const addItem = jest.fn();

describe("AddItemForm component", () => {
    it("AddItemForm should render", () => {
        const { getByRole, getByTestId } = render(
            <AddItemForm
                addItem={addItem}
                placeholder={"Введите что-нибудь..."}
            />
        );

        expect(getByRole("textbox")).toBeInTheDocument();
        expect(getByTestId("ControlPointIcon")).toBeInTheDocument();
    });

    describe("snapshots", () => {
        it("snapshot component", () => {
            const component = render(
                <AddItemForm
                    addItem={addItem}
                    placeholder={"Введите что-нибудь..."}
                />
            );

            expect(component).toMatchSnapshot();
        });

        it("snapshot component with error", () => {
            const component = render(
                <AddItemForm
                    addItem={addItem}
                    placeholder={"Введите что-нибудь..."}
                />
            );
            const btn = screen.getByTestId("ControlPointIcon");

            fireEvent.click(btn);

            expect(component).toMatchSnapshot();
        });
    });

    it("AddItem works", () => {
        const { getByRole, getByTestId } = render(
            <AddItemForm
                addItem={addItem}
                placeholder={"Введите что-нибудь..."}
            />
        );

        const input = getByRole("textbox", { name: "Введите что-нибудь..." });
        fireEvent.change(input, { target: { value: "$23.0" } });

        const btn = getByTestId("ControlPointIcon");
        fireEvent.click(btn);

        expect(addItem).toHaveBeenCalledTimes(1);
    });

    describe("Input", () => {
        it("input change", () => {
            const { getByRole } = render(
                <AddItemForm
                    addItem={addItem}
                    placeholder={"Введите что-нибудь..."}
                />
            );

            const input = getByRole("textbox", {
                name: "Введите что-нибудь...",
            }) as HTMLInputElement;
            fireEvent.change(input, { target: { value: "$23.0" } });

            expect(input.value).toBe("$23.0");
        });

        it("clear input", () => {
            const { getByRole, getByTestId } = render(
                <AddItemForm
                    addItem={addItem}
                    placeholder={"Введите что-нибудь..."}
                />
            );

            const btn = getByTestId("ControlPointIcon");
            const input = getByRole("textbox", {
                name: "Введите что-нибудь...",
            }) as HTMLInputElement;

            fireEvent.change(input, { target: { value: "$23.0" } });
            expect(input.value).toBe("$23.0");
            fireEvent.click(btn);
            expect(input.value).toBe("");
        });
    });

    describe("Error", () => {
        it("show error", () => {
            const { getByTestId, queryByText } = render(
                <AddItemForm
                    addItem={addItem}
                    placeholder={"Введите что-нибудь..."}
                />
            );

            const btn = getByTestId("ControlPointIcon");

            expect(queryByText("Title is empty")).toBeNull();

            fireEvent.click(btn);
            expect(queryByText("Title is empty")).toBeInTheDocument();
        });

        it("error disappears after a while", async () => {
            const { getByTestId, queryByText } = render(
                <AddItemForm
                    addItem={addItem}
                    placeholder={"Введите что-нибудь..."}
                />
            );

            const btn = getByTestId("ControlPointIcon");

            expect(queryByText("Title is empty")).toBeNull();

            fireEvent.click(btn);
            expect(queryByText("Title is empty")).toBeInTheDocument();

            await act(async () => {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        expect(queryByText("Title is empty")).toBeNull();
                        resolve();
                    }, 2500);
                });
            });
        });
    });
});
