import React from 'react';

export type CheckBoxPropsType = {
    callback: () => void
    checkedStatus: boolean
}

export const CheckBox = (props: CheckBoxPropsType) => {
    let {callback, checkedStatus} = props
    const onClickHandler = () => {
        callback()
    }
    return (
        <input type="checkbox" checked={checkedStatus} onChange={onClickHandler}/>
    )
}

