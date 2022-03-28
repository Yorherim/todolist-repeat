import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../App.scss";

import { EditableSpan } from "./EditableSpan";

export default {
    title: "Project/EditableSpan",
    component: EditableSpan,
    argTypes: {
        changeItem: { action: "change value" },
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const Default = Template.bind({});

Default.args = {
    value: "hello",
    itemId: "1",
};
