import { render } from "@testing-library/react";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { initialState as tasks } from "../../state/tasks-reducer";
import { initialState as todolists } from "../../state/todolists-reducer";

import App from "./";

describe("App", () => {
    const mockStore = configureStore();
    let store;

    // it("renders learn react link", () => {
    //     render(<App />);

    //     // expect(
    //     //     screen.getByRole("textbox", {
    //     //         name: "Add new todolist",
    //     //     })
    //     // ).toBeInTheDocument();
    // });

    it("snapshot", () => {
        store = mockStore({
            todolists,
            tasks,
        });
        const component = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(component).toMatchSnapshot();
    });
});
