import React, {ChangeEvent, KeyboardEvent} from "react";

export type SuperInputPropsType = {
    value: string
    error: string|null
    onClickCallBack: ()=> void
    onChangeCallBack: (e :ChangeEvent<HTMLInputElement>)=>void
    onKeyDownCallBack: (e: KeyboardEvent<HTMLInputElement>)=>void
}

export const SuperInput = (props: SuperInputPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeCallBack(e)
    }
    const KeyPressHandler =(e: KeyboardEvent<HTMLInputElement>)=> {
        props.onKeyDownCallBack(e)
    }
    const onClickHandler =()=>{
        props.onClickCallBack()
    }
    return (
        <div>
            <div>
                <input
                    onChange={onChangeHandler}
                    value={props.value}
                    className={props.error? "error": ""}
                    onKeyDown={e=>{KeyPressHandler(e)}}
                />
                <button onClick={onClickHandler}>
                    +
                </button>
            </div>
            <div>
                {props.error && <div className='error-message'>{props.error}</div>}
            </div>
        </div>
    )
}