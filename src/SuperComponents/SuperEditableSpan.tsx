import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


export type SuperEditableSpanType = {
    title: string
    callback: (newTitle: string) => void
}

export const SuperEditableSpan = (props: SuperEditableSpanType) => {
    //---------новое имя таски --------------------------------------
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newTaskTitle = e.currentTarget.value
        props.callback(newTaskTitle)
    }
    //------------------условный рендеринг----------------------------
    const [editMode, setEditMode] = useState(false)
    const editChangeHandler = () => {
        setEditMode(!editMode)
    }
    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === "Enter") editChangeHandler()
    }
    //-----------------------------------------------------------------
    return (
        editMode
            ? <input
                value={props.title}
                type="text"
                autoFocus
                onChange={onChangeHandler}
                onBlur={editChangeHandler}
                onKeyDown={(e) => {
                    onKeyDownHandler(e)
                }}/>
            : <span onDoubleClick={editChangeHandler}
            >{props.title}</span>
    )
};