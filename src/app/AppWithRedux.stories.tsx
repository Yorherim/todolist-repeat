import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./App.scss";
import App from "./App";
import { ReduxStoreProviderDecorator } from "../utils/ReduxStoreProviderDecorator";

export default {
    title: "Project/App",
    component: App,
    argTypes: {
        changeCheckStatus: { action: "change check status" },
        changeTaskTitle: { action: "change task title" },
        removeTask: { action: "remove task" },
    },
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const AppView = Template.bind({});

AppView.args = {};
