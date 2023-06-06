import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddBox from "@mui/icons-material/AddBox";



type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   size='small'
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label={error ? 'Title is required' : 'Type here'}
        />
        <IconButton
            color="primary"
            onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
}
