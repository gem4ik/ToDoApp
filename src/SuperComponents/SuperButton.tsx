import React from 'react';

export type SuperButtonType = {
    callback:()=> void
    title: string
}

export const SuperButton = (props: SuperButtonType) => {
    return (
        <div>
            <button
            onClick={props.callback}
            >
                {props.title}
            </button>
        </div>
    );
};