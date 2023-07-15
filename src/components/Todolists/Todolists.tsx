import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReduceType} from "../reduce/Store";
import {addNewTodolistAC, InitialTodolistType} from "../reduce/reduceTodolist";
import {Todo} from "../Todo/Todo";
import {AddItemForm} from "../AddItemForm/AddItemForm";

export const Todolists = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<RootReduceType, InitialTodolistType[]>(state => state.todolist)
const addNewTodolist=useCallback((newTitle:string)=>{
    dispatch(addNewTodolistAC(newTitle))


},[dispatch])

    return (
        <div>
            <div><h1>ADD Todolist</h1>
                <AddItemForm callback={addNewTodolist}/></div>
            {
                todolists.map(el => {
                    return (
                        <Todo key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        filterStatus={el.filter}/>
                    )
                })
            }
        </div>
    )
}