import React, {memo} from 'react';
import {UniversalButton} from "../UniversalButton/UniversalButton";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Tasks} from "../Tasks/Tasks";
import {FilterType, newStatusFilterAC, newTitleTodoAC, removeTodolistAC} from "../reduce/reduceTodolist";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {addNewTaskAC} from "../reduce/reducerTask";

export type TodoPropsType = {
    todolistId: string
    title: string
    filterStatus: FilterType
}


export const Todo = memo((props: TodoPropsType) => {
    let {todolistId, title, filterStatus} = props
    const dispatch = useDispatch()


    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistId))
    }
    const addNewTask = (newTaskTitle: string) => {
        dispatch(addNewTaskAC(todolistId, newTaskTitle))
    }
    const newTitleTodo=(newTodoTitle:string)=>{
dispatch(newTitleTodoAC(todolistId,newTodoTitle))
    }
    const newStatusFilter=(newStatus:FilterType)=>{
dispatch(newStatusFilterAC(todolistId,newStatus))
    }
    return (
        <div>

            <b><EditableSpan callback={newTitleTodo} oldTitle={title}/></b>
            <UniversalButton callback={removeTodolist} nameButton={"X"}/>
            <AddItemForm callback={addNewTask}/>
            <Tasks todolistId={todolistId} filterStatus={filterStatus}/>
            <UniversalButton callback={() => newStatusFilter("All")} nameButton={"All"}/>
            <UniversalButton callback={() => newStatusFilter("Active")} nameButton={"Active"}/>
            <UniversalButton callback={() => newStatusFilter("Completed")} nameButton={"Completed"}/>

        </div>
    );
});

