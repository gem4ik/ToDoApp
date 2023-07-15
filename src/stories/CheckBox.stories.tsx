import {Meta, Story} from "@storybook/react";
import {CheckBox, CheckBoxPropsType} from "../components/CheckBox/CheckBox";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todo/CheckBox',
    component: CheckBox,
    args: {
        checkedStatus: false,
        callback: action('Checkbox clicked'),
    }
} as Meta;

const Template: Story<CheckBoxPropsType> = (args) => < CheckBox {...args} />;

export const onCheckbox = Template.bind({});
onCheckbox.args = {
    checkedStatus: false
};
export const offCheckbox = Template.bind({});
offCheckbox.args = {
    checkedStatus: true
}
