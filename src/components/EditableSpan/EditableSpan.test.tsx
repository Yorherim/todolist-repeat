import { render, fireEvent } from "@testing-library/react";
import { EditableSpan } from "./";

const onChangeTitle = (newValue: string) => {};

// describe("EditableSpan component", () => {
//     describe("render", () => {
//         it("component should be render with span", () => {
//             const { getByRole } = render(
//                 <EditableSpan title={"hello"} onChangeTitle={onChangeTitle} />
//             );

//             expect(getByRole("span")).toBeInTheDocument();
//         });
//     });
// });
