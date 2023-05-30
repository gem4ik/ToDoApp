import React, {ChangeEvent, useState} from 'react';
import s from './App.module.css';
import {SuperAddItemForm} from "./SuperComponents/SuperAddItemForm";
import {v1} from "uuid";
import {Tasks} from "./tasks";
import {SuperEditableSpan} from "./SuperComponents/SuperEditableSpan";
import Button from '@mui/material/Button';

export type FilterValueType = "All" | "Completed" | "Active"
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    let [toDoLists, setToDoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: "Want to Create", filter: 'All'},
        {id: todoListId2, title: "Want to Buy", filter: 'All'},
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'NativeJS', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'NativeJS', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ]
    })
//-----------функции для тудулиста------------------------------------
    const addTodolist = (title: string) => {
        const todoListId = v1()
        const newTodoList: TodoListsType = {id: todoListId, title: title, filter: 'All'}
        setToDoLists([...toDoLists, newTodoList])
        setTasks({...tasks, [todoListId]: []})
    }
    const removeTodolist = (todoListId: string) => {
        setToDoLists(toDoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }
    const ChangeTodoTitle = (todoListId: string, newTitle: string) => {
        debugger
        const todo = toDoLists.find(t => t.id === todoListId)
        if (todo) todo.title = newTitle
        setToDoLists([...toDoLists])
    }
//-------------функции для тасок--------------------------------------
    const addTask = (todoListId: string, title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    const removeTask = (todoListId: string, id: string) => {
        const newTask = tasks[todoListId]
        tasks[todoListId] = newTask.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    function ChangeTaskStatus(todoListId: string, id: string, newIsDone: boolean) {
        const task = tasks[todoListId].find(t => t.id === id)
        if (task) task.isDone = newIsDone
        setTasks({...tasks})
    }
    const ChangeTaskTitle = (todoListId: string, id: string, newTitle: string) => {
        const task = tasks[todoListId].find(t => t.id === id)
        if (task) task.title = newTitle
        setTasks({...tasks})
    }


    return (
        <div className={s.wrapper}>
            <div>
                <SuperAddItemForm
                    addItem={addTodolist}
                    title={'+'}
                />
            </div>
            {toDoLists.map(tl => {
                const removeTodolistHandler = () => {
                    removeTodolist(tl.id)
                }
                const addTaskHandler = (title: string) => {
                    addTask(tl.id, title)
                }
                const filteredTasks = (todoListId: string, value: FilterValueType) => {
                    const toDo = toDoLists.find(tl => tl.id === todoListId)
                    if (toDo) {
                        tl.filter = value
                        setToDoLists([...toDoLists])
                    }
                }
                const ChangeTodoTitleHandler = (title: string) => {
                    ChangeTodoTitle(tl.id, title)
                }

                let allTasks = tasks[tl.id]
                let tasksToShow = allTasks
                if (tl.filter === "Completed") {
                    tasksToShow = allTasks.filter(t => t.isDone)
                }
                if (tl.filter === "Active") {
                    tasksToShow = allTasks.filter(t => !t.isDone)
                }

                return (
                    <div className={s.task}>
                        <div className={s.title}>
                            <h3><SuperEditableSpan
                                title={tl.title}
                                callback={ChangeTodoTitleHandler}/></h3>
                            <Button
                                onClick={removeTodolistHandler}
                                variant="contained"
                            >x</Button>
                        </div>
                        <div>
                            <SuperAddItemForm
                                addItem={addTaskHandler}
                                title={"+"}
                            />
                        </div>
                        <div>
                            {tasksToShow.map((t,index) => {
                                const OnChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                    let newIsDone = e.currentTarget.checked
                                    ChangeTaskStatus(tl.id, t.id, newIsDone)
                                }
                                const ChangeTaskTitleHandler = (newTitle: string) => {
                                    ChangeTaskTitle(tl.id, t.id, newTitle)
                                }
                                const removeTaskHandler = () => {
                                    removeTask(tl.id, t.id)
                                }
                                return (
                                    <Tasks
                                        key={index}
                                        tasks={t.title}
                                        isDone={t.isDone}
                                        removeTask={removeTaskHandler}
                                        OnChangeStatusHandler={OnChangeStatus}
                                        ChangeTaskTitleHandler={ChangeTaskTitleHandler}
                                    />
                                )
                            })}
                        </div>
                        <div className={s.filterButton}>
                            <button
                                onClick={() => {
                                    filteredTasks(tl.id, "All")
                                }}
                                className={(tl.filter === "All") ? s.activeFilter : ""}>All
                            </button>
                            <button
                                onClick={() => {
                                    filteredTasks(tl.id, "Active")
                                }}
                                className={(tl.filter === "Active") ? s.activeFilter : ""}>Active
                            </button>
                            <button onClick={() => {
                                filteredTasks(tl.id, "Completed")
                            }}
                                    className={(tl.filter === "Completed") ? s.activeFilter : ""}>Completed
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default App;