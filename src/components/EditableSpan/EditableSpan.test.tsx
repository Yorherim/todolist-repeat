import { render, fireEvent } from "@testing-library/react";
import { EditableSpan } from "./";

const onChangeTitle = (newValue: string) => {};

describe("EditableSpan component", () => {
    it("component should be render with span", () => {
        const { getByText } = render(
            <EditableSpan title={"hello"} onChangeTitle={onChangeTitle} />
        );

        expect(getByText("hello")).toBeInTheDocument();
    });

    describe("snapshots", () => {
        it("snapshot component span", () => {
            const component = render(
                <EditableSpan title={"hello"} onChangeTitle={onChangeTitle} />
            );

            expect(component).toMatchSnapshot();
        });

        it("snapshot component input", () => {
            const { getByText, getByRole } = render(
                <EditableSpan title={"hello"} onChangeTitle={onChangeTitle} />
            );

            const span = getByText("hello");
            fireEvent.doubleClick(span);

            expect(getByRole("textbox")).toMatchSnapshot();
        });
    });

    describe("component change span / input", () => {
        it("component should become input instead of span with double click", () => {
            const { getByText, getByRole } = render(
                <EditableSpan title={"hello"} onChangeTitle={onChangeTitle} />
            );

            const span = getByText("hello");
            fireEvent.doubleClick(span);

            expect(getByRole("textbox")).toBeInTheDocument();
        });

        it("component should become span instead of input with onBlur", () => {
            const { getByText, getByRole, getByTestId } = render(
                <EditableSpan title={"hello"} onChangeTitle={onChangeTitle} />
            );

            const span = getByText("hello");
            fireEvent.doubleClick(span);

            const input = getByRole("textbox") as HTMLInputElement;
            fireEvent.blur(input);

            expect(getByTestId("span-element")).toBeInTheDocument();
        });
    });

    describe("input", () => {
        it("input change", () => {
            const { getByText, getByRole } = render(
                <EditableSpan title={"hello"} onChangeTitle={onChangeTitle} />
            );

            const span = getByText("hello");
            fireEvent.doubleClick(span);

            const input = getByRole("textbox") as HTMLInputElement;
            fireEvent.change(input, { target: { value: "$23.0" } });

            expect(input.value).toBe("$23.0");
        });
    });
});
