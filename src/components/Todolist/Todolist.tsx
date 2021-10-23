import { render, fireEvent } from "@testing-library/react";
import { v1 } from "uuid";

import { Todolist, TodolistPropsType } from "./";

let mockProps: TodolistPropsType = {
    todolistId: v1(),
    title: "1st",
    tasks: [
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "React", isDone: false },
    ],
    todoListFilter: "all",
    changeTodoListFilter: jest.fn(),
    addTask: jest.fn(),
    removeTask: jest.fn(),
    changeCheckStatus: jest.fn(),
    removeTodolist: jest.fn(),
    changeTaskTitle: jest.fn(),
    changeTitleTodolist: jest.fn(),
};

// describe("Todolist component", () => {
//     it("render todolist", () => {
//         const { getByText, getByRole, getAllByRole, queryByText, getByTestId } =
//             render(
//                 <Todolist
//                     todolistId={mockProps.todolistId}
//                     title={mockProps.title}
//                     tasks={mockProps.tasks}
//                     changeTodoListFilter={mockProps.changeTodoListFilter}
//                     addTask={mockProps.addTask}
//                     removeTask={mockProps.removeTask}
//                     changeCheckStatus={mockProps.changeCheckStatus}
//                     todoListFilter={mockProps.todoListFilter}
//                     removeTodolist={mockProps.removeTodolist}
//                     changeTaskTitle={mockProps.changeTaskTitle}
//                     changeTitleTodolist={mockProps.changeTitleTodolist}
//                 />
//             );

//         expect(getByText("1st")).toBeInTheDocument();
//         expect(getByRole("textbox")).toBeInTheDocument();
//         expect(getByTestId("ControlPointIcon")).toBeInTheDocument();
//         expect(getAllByRole("button", { name: "x" })).toHaveLength(4);
//         expect(queryByText("HTML")).toBeInTheDocument();
//         expect(queryByText("CSS")).toBeInTheDocument();
//         expect(queryByText("React")).toBeInTheDocument();
//         expect(getByRole("button", { name: /all/i })).toBeInTheDocument();
//         expect(getByRole("button", { name: /active/i })).toBeInTheDocument();
//         expect(getByRole("button", { name: /completed/i })).toBeInTheDocument();
//     });

//     it("todolist snapshot", () => {
//         const component = render(
//             <Todolist
//                 todolistId={mockProps.todolistId}
//                 title={mockProps.title}
//                 tasks={mockProps.tasks}
//                 changeTodoListFilter={mockProps.changeTodoListFilter}
//                 addTask={mockProps.addTask}
//                 removeTask={mockProps.removeTask}
//                 changeCheckStatus={mockProps.changeCheckStatus}
//                 todoListFilter={mockProps.todoListFilter}
//                 removeTodolist={mockProps.removeTodolist}
//                 changeTaskTitle={mockProps.changeTaskTitle}
//                 changeTitleTodolist={mockProps.changeTitleTodolist}
//             />
//         );

//         expect(component).toMatchSnapshot();
//     });

//     describe("tasks", () => {
//         it("removeTask works (delete task from todolist)", () => {
//             const { getAllByRole } = render(
//                 <Todolist
//                     todolistId={mockProps.todolistId}
//                     title={mockProps.title}
//                     tasks={mockProps.tasks}
//                     changeTodoListFilter={mockProps.changeTodoListFilter}
//                     addTask={mockProps.addTask}
//                     removeTask={mockProps.removeTask}
//                     changeCheckStatus={mockProps.changeCheckStatus}
//                     todoListFilter={mockProps.todoListFilter}
//                     removeTodolist={mockProps.removeTodolist}
//                     changeTaskTitle={mockProps.changeTaskTitle}
//                     changeTitleTodolist={mockProps.changeTitleTodolist}
//                 />
//             );
//             const btn = getAllByRole("button", { name: "x" })[3];

//             fireEvent.click(btn);

//             expect(mockProps.removeTask).toHaveBeenCalledTimes(1);
//         });

//         it("addTask works (add task to todolist)", () => {
//             const { getByTestId, getByText } = render(
//                 <Todolist
//                     todolistId={mockProps.todolistId}
//                     title={mockProps.title}
//                     tasks={mockProps.tasks}
//                     changeTodoListFilter={mockProps.changeTodoListFilter}
//                     addTask={mockProps.addTask}
//                     removeTask={mockProps.removeTask}
//                     changeCheckStatus={mockProps.changeCheckStatus}
//                     todoListFilter={mockProps.todoListFilter}
//                     removeTodolist={mockProps.removeTodolist}
//                     changeTaskTitle={mockProps.changeTaskTitle}
//                     changeTitleTodolist={mockProps.changeTitleTodolist}
//                 />
//             );
//             const btn = getByTestId("ControlPointIcon");
//             const input = getByText("Add new task");

//             fireEvent.change(input, { target: { value: "new task" } });

//             fireEvent.click(btn);

//             expect(mockProps.addTask).toHaveBeenCalledTimes(1);
//         });
//     });
// });
