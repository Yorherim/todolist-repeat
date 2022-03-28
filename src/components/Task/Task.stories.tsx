import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../App.scss";

import { Task } from "./Task";
import { TaskType } from "../../state/tasks-reducer";

export default {
    title: "Project/Task",
    component: Task,
    argTypes: {
        changeCheckStatus: { action: "change check status" },
        changeTaskTitle: { action: "change task title" },
        removeTask: { action: "remove task" },
    },
} as ComponentMeta<typeof Task>;

const taskIsDone: TaskType = {
    id: "1",
    title: "buy milk",
    isDone: true,
};
const taskIsNotDone: TaskType = {
    id: "2",
    title: "buy juice",
    isDone: false,
};

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const IsDone = Template.bind({});
export const IsNotDone = Template.bind({});

IsDone.args = { task: taskIsDone, todolistId: "todolistId" };
IsNotDone.args = { task: taskIsNotDone, todolistId: "todolistId" };
