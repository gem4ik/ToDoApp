import React, {memo, useCallback} from 'react';
import {CheckBox} from "../CheckBox/CheckBox";
import {UniversalButton} from "../UniversalButton/UniversalButton";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {newCheckedStatusAC, newTitleTaskAC, removeTaskAC} from "../reduce/reducerTask";
import s from './Task.module.css'


export type TaskPropsType={
    checked:boolean
    title:string
    todolistId:string
    taskId:string
}

export const Task = memo((props:TaskPropsType) => {
    let{checked,title,todolistId,taskId}=props

    const dispatch = useDispatch()

    const removeTask=useCallback(()=>{
        dispatch(removeTaskAC(todolistId,taskId))
    },[dispatch, taskId, todolistId])
    const newCheckedStatus=useCallback(()=>{
        dispatch(newCheckedStatusAC(todolistId,taskId))
    },[dispatch, taskId, todolistId])
    const newTitleTask= useCallback((newTitle:string)=>{
        dispatch(newTitleTaskAC(todolistId,taskId,newTitle))
    },[dispatch, taskId, todolistId])
    return (
        <div className={s.TaskWrapper}>
            <CheckBox callback={newCheckedStatus} checkedStatus={checked}/>
            <EditableSpan callback={newTitleTask} oldTitle={title}/>
            <UniversalButton callback={removeTask} nameButton={"X"}/></div>
    );
})