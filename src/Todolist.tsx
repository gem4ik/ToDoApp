import React, {FC} from "react";
import {FilterValueType} from "./App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTasks: (id:number) => void
    FilteredTasks: (value: FilterValueType) => void
    CheckedTasks: (value: boolean) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        FilteredTasks,
        RemoveTasks
    }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map(t => <li>
                        <input type="checkbox" onChange={ ()=>{CheckedTasks()} }
                        />
                        <span>{t.title}</span>
                        <button onClick={() => {
                            RemoveTasks(t.id)
                        }}>x
                        </button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => {
                    FilteredTasks("All")
                }}>All
                </button>
                <button onClick={() => {
                    FilteredTasks("Active")
                }}>Active
                </button>
                <button onClick={() => {
                    FilteredTasks("Completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList