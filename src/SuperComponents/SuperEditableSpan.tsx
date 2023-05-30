    import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


    export type SuperEditableSpanType = {
        title: string
        callback: (newTitle: string)=> void
    }

    export const SuperEditableSpan = (props: SuperEditableSpanType) => {
        //---------новое имя таски --------------------------------------
        const onChangeHandler =(e: ChangeEvent<HTMLInputElement>)=> {
            const newTaskTitle = e.currentTarget.value
            props.callback(newTaskTitle)
        }
        //------------------условный рендеринг----------------------------
        const [editMode, setEditMode] = useState(false)
        const onClickHandler = () => {
            setEditMode(true)
        }
        const onBlurHandler = () => {
            setEditMode(!editMode)

        }
        const onKeyDownHandler = (e: KeyboardEvent) => {
            if (e.key === "Enter") onBlurHandler()
        }
        //-----------------------------------------------------------------
        return (
            <div>
                {editMode ?
                    <input
                        value={props.title}
                        type="text"
                        autoFocus
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                        onKeyDown={(e)=>{onKeyDownHandler(e)}}
                    /> :
                    <span onDoubleClick={onClickHandler}
                    >{props.title}</span>

                }
            </div>
        )
    };