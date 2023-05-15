import React, {ChangeEvent, FC, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import './Todolist.css'

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTasks: (id: string) => void
    FilteredTasks: (value: FilterValueType) => void
    AddNewTaskTitle:(newTask: string)=>void
    filtered: FilterValueType
    ChangeTaskStatus: (id: string, newIsDone: boolean)=> void
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
        ChangeTaskStatus
    }) => {
    let [newTask, setNewTask] = useState<string>('')
    let [error, setError] = useState<string|null>(null)
    const NewTaskAddHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTask(e.currentTarget.value)
    }
    const ButtonAddTaskHandler = () => {
        if (newTask.trim() === "") return setError("field is required")
        AddNewTaskTitle(newTask.trim())
        setNewTask('')
    }
    const KeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") ButtonAddTaskHandler()
    }


    const mappedTasks =  tasks.map(t => {
        const OnChangeStatsHandler = (e: ChangeEvent<HTMLInputElement>) =>{
            let newIsDone = e.currentTarget.checked
            ChangeTaskStatus(t.id, newIsDone)
        }
        return (
            <li className={(t.isDone)? "is-done" : ""}>
                <input type = "checkbox"
                       checked={t.isDone}
                       onChange={OnChangeStatsHandler}
                />
                <span>{t.title}</span>
                <button onClick={() => {
                    RemoveTasks(t.id)
                }}>x
                </button>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
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
                    onClick={() => {FilteredTasks("All")}}
                    className={(filtered === "All")? "active-filter": ""}
                >All
                </button>
                <button
                    onClick={() => {FilteredTasks("Active")}}
                    className={(filtered === "Active")? "active-filter": ""}
                >Active
                </button>
                <button onClick={() => {FilteredTasks("Completed")}}
                        className={(filtered === "Completed")? "active-filter": ""}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList