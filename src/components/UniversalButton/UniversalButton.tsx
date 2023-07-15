import React from 'react';

export type UniversalButtonPropsType={
    callback:()=>void
    nameButton:string
}



export const UniversalButton = (props:UniversalButtonPropsType) => {
    let{callback,nameButton}=props
    const onClickHandler=()=>{
        callback()
    }
    return (
        <button onClick={onClickHandler}>{nameButton}</button>
    );
}

