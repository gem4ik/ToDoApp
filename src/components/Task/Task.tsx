import React from 'react';
import {CheckBox} from "../CheckBox/CheckBox";
import {UniversalButton} from "../UniversalButton/UniversalButton";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {newCheckedStatusAC, newTitleTaskAC, removeTaskAC} from "../reduce/reducerTask";


export type TaskPropsType={
    checked:boolean
    title:string
    todolistId:string
    taskId:string
}


export const Task = (props:TaskPropsType) => {
    let{checked,title,todolistId,taskId}=props
    const dispatch = useDispatch()
const removeTask=()=>{
        dispatch(removeTaskAC(todolistId,taskId))
}
const newCheckedStatus=()=>{
        dispatch(newCheckedStatusAC(todolistId,taskId))
}
const newTitleTask=(newTitle:string)=>{
dispatch(newTitleTaskAC(todolistId,taskId,newTitle))
}
    return (
        <div><CheckBox callback={newCheckedStatus} checkedStatus={checked}/>
            <EditableSpan callback={newTitleTask} oldTitle={title}/>
            <UniversalButton callback={removeTask} nameButton={"X"}/></div>
    );
};

