import React from "react";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTasks: Function
    FilterTasks: Function
}

export type TaskType = {
        id: number
        title: string
        isDone: boolean
    }

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map( t => <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ ()=>{props.RemoveTasks(t.id)} }>x</button>
                    </li> )
                }
            </ul>
            <div>
                <button onClick={ ()=>{props.FilterTasks("All")} }>All</button>
                <button onClick={ ()=>{props.FilterTasks("Active")} }>Active</button>
                <button onClick={ ()=>{props.FilterTasks("Completed")} }>Completed</button>
            </div>
        </div>
    )
}

export default TodoList