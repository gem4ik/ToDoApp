import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useState} from 'react';

export type AddItemFormPropsType = {
    callback: (value: string) => void
    storyError?: string
}


export const AddItemForm = (props: AddItemFormPropsType) => {
    let {callback, storyError} = props
    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        if (storyError) {
            setError(storyError)
        }
    },[])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(null)
    },[])
    const onClickHandler = useCallback(() => {
         if (value.trim() !== "") {
                callback(value.trim())
                setValue("")
                setError(null)
            } else {
                setError("Not correct")
            }
    }, [callback, value])
    const onKeyHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickHandler()
        }
    }, [onClickHandler])

    return (
        <div>
            <input type="text" onChange={onChangeHandler} onKeyDown={onKeyHandler} value={value}/>
            <button onClick={onClickHandler}>ADD</button>
            {error && <span>{error}</span>}
        </div>
    );
}