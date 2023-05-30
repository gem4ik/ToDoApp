import React, {ChangeEvent} from 'react';

import s from './Tasks.module.css'
import {SuperButton} from "./SuperComponents/SuperButton";
import {SuperEditableSpan} from "./SuperComponents/SuperEditableSpan";
import {Checkbox} from "@mui/material";

export type TasksPropsType = {
    tasks: string
    isDone: boolean
    removeTask: () => void
    OnChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    ChangeTaskTitleHandler: (newTitle: string) => void
}

export const Tasks = (props: TasksPropsType) => {

    const {
        tasks,
        isDone,
        ChangeTaskTitleHandler,
    } = props
    return (
        <div className={s.tasks}>
            <Checkbox
                color='primary'
                className={s.checkBox}
                checked={isDone}
                onChange={props.OnChangeStatusHandler}
            />
            <SuperEditableSpan
                callback={ChangeTaskTitleHandler}
                title={tasks}
            />
            <SuperButton
                callback={props.removeTask}
            />
        </div>
    );
};