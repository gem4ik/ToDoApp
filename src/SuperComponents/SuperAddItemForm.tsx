import {SuperButton} from "./SuperButton";
import s from './SuperAddItemForm.module.css'
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type SuperAddItemFormProps = {
    addItem: (title: string)=>void
    title: string
}

export const SuperAddItemForm =(props: SuperAddItemFormProps)=> {

    const [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        props.addItem(title)
        setTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickHandler()
    }

    return(
        <div className={s.addItemForm}>
            <input
                value={title}
                type="text"
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <SuperButton
                callback={onClickHandler}
                title={props.title}
            />
        </div>
    )
}