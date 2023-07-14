import React, {ChangeEvent, useState, KeyboardEvent, memo} from 'react';

export type AddItemFormPropsType={
    callback:(value:string)=>void
}


export const AddItemForm = memo((props:AddItemFormPropsType) => {
let{callback}=props
    const[value,setValue]=useState<string>("")
    const [error,setError]=useState<string|null>(null)

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)
        setError(null)
    }
    const onKeyHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
    if (e.currentTarget.value==="Enter"){
        onClickHandler()
    }

    }
    const onClickHandler=()=>{
        if(value.trim()!==""){
            callback(value.trim())
            setValue("")
            setError(null)
        }
        else{
            setError("No corrected")
        }
    }

    return (
        <div>
            <input type="text" onChange={onChangeHandler} onKeyDown={onKeyHandler} value={value}/>
            <button onClick={onClickHandler}>ADD</button>
            {error && <span>{error}</span>}
        </div>
    );
});

