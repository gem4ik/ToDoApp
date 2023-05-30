import s from './SuperAddItemForm.module.css'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

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
            <TextField variant='outlined'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={s.input}/>
            <IconButton onClick={onClickHandler}>
                <AddBox/>
            </IconButton>
        </div>
    )
}