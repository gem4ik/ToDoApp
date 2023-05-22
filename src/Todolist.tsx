import React, {ChangeEvent, FC, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import './Todolist.css'

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTasks: (todoListId:string, id: string) => void
    FilteredTasks: (todoListId:string, value: FilterValueType) => void
    AddNewTaskTitle:(todoListId:string,newTask: string)=>void
    filtered: FilterValueType
    ChangeTaskStatus: (todoListId:string, id: string, newIsDone: boolean)=> void
    todoListId: string
    removeTodo: (todoListId:string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        FilteredTasks,
        RemoveTasks,
        AddNewTaskTitle,
        filtered,
        ChangeTaskStatus,
        todoListId,
        removeTodo
    }) => {
    let [newTask, setNewTask] = useState<string>('')
    let [error, setError] = useState<string|null>(null)
    const NewTaskAddHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTask(e.currentTarget.value)
    }
    const ButtonAddTaskHandler = () => {
        if (newTask.trim() === "") return setError("field is required")
        AddNewTaskTitle(todoListId, newTask.trim())
        setNewTask('')
    }
    const KeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") ButtonAddTaskHandler()
    }
    const deleteToDoHandler =()=>{
        removeTodo(todoListId)
    }


    const mappedTasks =  tasks.map(t => {
        const OnChangeStatsHandler = (e: ChangeEvent<HTMLInputElement>) =>{
            let newIsDone = e.currentTarget.checked
            ChangeTaskStatus(todoListId, t.id, newIsDone)
        }
        return (
            <li className={(t.isDone)? "is-done" : ""} key={t.id}>
                <input type = "checkbox"
                       checked={t.isDone}
                       onChange={OnChangeStatsHandler}
                />
                <span>{t.title}</span>
                <button onClick={() => {
                    RemoveTasks(todoListId, t.id)
                }}>x
                </button>
            </li>
        )
    })

    return (
        <div>
            <div className={"header"}>
                <h3>{title}</h3>
                <button
                    onClick={deleteToDoHandler}
                >X</button>
            </div>
            <div>
                <input
                    onChange={(e)=>{NewTaskAddHandler(e)}}
                    value={newTask}
                    className={error? "error": ""}
                    onKeyDown={e=>{KeyPressHandler(e)}}
                />
                <button
                    onClick={ButtonAddTaskHandler}
                >+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button
                    onClick={() => {FilteredTasks(todoListId,"All")}}
                    className={(filtered === "All")? "active-filter": ""}
                >All
                </button>
                <button
                    onClick={() => {FilteredTasks(todoListId,"Active")}}
                    className={(filtered === "Active")? "active-filter": ""}
                >Active
                </button>
                <button onClick={() => {FilteredTasks(todoListId,"Completed")}}
                        className={(filtered === "Completed")? "active-filter": ""}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList