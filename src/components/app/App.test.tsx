import { render, screen, fireEvent } from "@testing-library/react";

import App from "./";

describe("App", () => {
    it("renders learn react link", () => {
        render(<App />);

        // expect(
        //     screen.getByRole("textbox", {
        //         name: "Add new todolist",
        //     })
        // ).toBeInTheDocument();
    });

    it("snapshot", () => {
        const component = render(<App />);

        expect(component).toMatchSnapshot();
    });
});
