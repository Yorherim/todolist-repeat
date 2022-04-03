import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../app/App.scss";

import { AddItemForm } from "./AddItemForm";

export default {
    title: "Project/AddItemForm",
    component: AddItemForm,
    argTypes: {
        addItem: { action: "addItem" },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const Default = Template.bind({});

Default.args = {
    className: "input-todolist",
};
