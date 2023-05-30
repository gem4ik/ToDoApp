import React from 'react';
import s from './SuperButton.module.css'

export type SuperButtonType = {
    callback:()=> void
    title: string
}

export const SuperButton = (props: SuperButtonType) => {
    return (
        <div className={s.button}>
            <button
            onClick={props.callback}
            >
                {props.title}
            </button>
        </div>
    );
};