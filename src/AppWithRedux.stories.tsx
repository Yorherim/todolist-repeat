import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./App.scss";
import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
    title: "Project/AppWithRedux",
    component: AppWithRedux,
    argTypes: {
        changeCheckStatus: { action: "change check status" },
        changeTaskTitle: { action: "change task title" },
        removeTask: { action: "remove task" },
    },
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => (
    <AppWithRedux {...args} />
);

export const App = Template.bind({});

App.args = {};
