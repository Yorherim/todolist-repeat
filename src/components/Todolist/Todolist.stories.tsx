import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../App.scss";

import { Todolist } from "./Todolist";
import { ReduxStoreProviderDecorator, todolistId1 } from "../../common/ReduxStoreProviderDecorator";

export default {
    title: "Project/Todolist",
    component: Todolist,
    argTypes: {
        changeFilter: { action: "change filter todolist" },
        removeTodolist: { action: "remove todolist" },
        addTask: { action: "add task" },
    },
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Todolist>;

const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodolistExample = Template.bind({});

TodolistExample.args = { title: "Todolist1", filter: "all", todolistId: todolistId1 };
