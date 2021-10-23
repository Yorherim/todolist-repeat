import { render, screen, fireEvent } from "@testing-library/react";

import App from "./";

describe("App", () => {
    it("renders learn react link", () => {
        render(<App />);
        const linkElement = screen.getByText(/Add new todolist/i);
        expect(linkElement).toBeInTheDocument();
    });

    it("snapshot", () => {
        const component = render(<App />);

        expect(component).toMatchSnapshot();
    });

    it("add new todolist is working", () => {
        const { getByText, queryByText, getByPlaceholderText, getByTestId } =
            render(<App />);

        expect(getByText("1st")).toBeInTheDocument();
        expect(getByText("2nd")).toBeInTheDocument();
        expect(queryByText("3nd")).toBeNull();

        const input = getByPlaceholderText("Введите название тудулиста");
        const btn = getByTestId("btn-todolist");

        fireEvent.change(input, { target: { value: "3nd" } });
        fireEvent.click(btn);

        expect(getByText("3nd")).toBeInTheDocument();
    });
});
