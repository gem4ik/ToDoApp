import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useCallback, useState} from 'react';


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);
    console.log(title)
    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(props.value);
    },[])
    const activateViewMode = useCallback(() => {
        setEditMode(false);
        props.onChange(title);
    },[])
    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    },[])

    return (
        editMode
            ? <TextField variant="outlined"
                         value={title}
                         size='small'
                         onChange={changeTitle}
                         autoFocus
                         onBlur={activateViewMode}/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
})