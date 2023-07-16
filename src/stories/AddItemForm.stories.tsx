import React from 'react';
import { action } from '@storybook/addon-actions';
import { AddItemForm, AddItemFormPropsType } from '../components/AddItemForm/AddItemForm';
import {Meta, Story} from "@storybook/react";

export default {
    title: 'Todo/AddItemForm',
    component: AddItemForm,
    argTypes: {
        callback: { action: 'text' },
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const DefaultForm = Template.bind({});
DefaultForm.args = {
    callback: action('caught text:')
};
export const ErrorForm = Template.bind({});
ErrorForm.args = {
    storyError: 'косяк',
}
