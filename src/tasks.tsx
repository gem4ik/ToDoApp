import React, {ChangeEvent} from 'react';

import s from './Tasks.module.css'
import {SuperButton} from "./SuperComponents/SuperButton";
import {SuperEditableSpan} from "./SuperComponents/SuperEditableSpan";

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
            <input
                className={s.checkBox}
                type="checkbox"
                   checked={isDone}
                   onChange={props.OnChangeStatusHandler}
            />
            <SuperEditableSpan
                callback={ChangeTaskTitleHandler}
                title={tasks}
            />
            <SuperButton
                callback={props.removeTask}
                title={'X'}
            />
        </div>
    );
};