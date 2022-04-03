import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../App.scss";

import { Task } from "./Task";
import { TaskPriorities, TaskStatus } from "../../api/api";
import { TaskStateType } from "../../state/tasks-reducer";

export default {
    title: "Project/Task",
    component: Task,
    argTypes: {
        changeCheckStatus: { action: "change check status" },
        changeTaskTitle: { action: "change task title" },
        removeTask: { action: "remove task" },
    },
} as ComponentMeta<typeof Task>;

const taskIsDone: TaskStateType = {
    id: "1",
    title: "buy milk",
    status: TaskStatus.Completed,
    addedDate: "",
    description: "",
    startDate: "",
    order: 0,
    deadline: "",
    completed: false,
    priority: TaskPriorities.Low,
    todoListId: "todolistId",
    entityStatus: "idle",
};
const taskIsNotDone: TaskStateType = {
    id: "2",
    title: "buy juice",
    status: TaskStatus.New,
    addedDate: "",
    description: "",
    startDate: "",
    order: 0,
    deadline: "",
    completed: false,
    priority: TaskPriorities.Low,
    todoListId: "todolistId",
    entityStatus: "idle",
};

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const IsDone = Template.bind({});
export const IsNotDone = Template.bind({});

IsDone.args = { task: taskIsDone, todolistId: "todolistId" };
IsNotDone.args = { task: taskIsNotDone, todolistId: "todolistId" };
