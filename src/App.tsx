import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {SuperInput} from "./SuperComponents/SuperInput";

export type FilterValueType = "All" | "Completed" | "Active"
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoListId3 = v1()
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

    function removeTodo(todoListId: string) {
        setToDoLists(toDoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }
//-------------------------------------------------------------------------
    let [error, setError] = useState<string|null>(null)
    let [newToDoTitle, setNewToDoTitle] = useState<string>('')
    function addToDoTitle(e: ChangeEvent<HTMLInputElement>) {
        setError(null)
        const newTitle = e.currentTarget.value
        setNewToDoTitle(newTitle)
    }
    const ButtonAddToDoHandler = () => {
        debugger
        if (newToDoTitle.trim() === "") return setError("field is required")
        const newToDo: TodoListsType = {id:todoListId3, title:newToDoTitle, filter: 'All'}
        setToDoLists([...toDoLists, newToDo])
        setTasks({...tasks, [todoListId3]: []})
        setNewToDoTitle('')
    }
    const KeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") ButtonAddToDoHandler()
    }
//-------------------------------------------------------------------------
    function RemoveTasks(todoListId: string, id: string) {
        const newTask = tasks[todoListId]
        tasks[todoListId] = newTask.filter(t => t.id !== id)
        setTasks({...tasks})
    }

//-------------------------------------------------------------------------
    function AddNewTaskTitle(todoListId: string, newTask: string) {
        let task = {id: v1(), title: newTask, isDone: false}
        let todolistTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

//-------------------------------------------------------------------------
    function ChangeTaskStatus(todoListId: string, id: string, newIsDone: boolean) {
        const task = tasks[todoListId].find(t => t.id === id)
        if (task) task.isDone = newIsDone
        setTasks({...tasks})
    }

    return <div className="App">
        <SuperInput
            value={newToDoTitle}
            error={error}
            onClickCallBack={ButtonAddToDoHandler}
            onChangeCallBack={(e)=>{addToDoTitle(e)}}
            onKeyDownCallBack={(e)=>{KeyPressHandler(e)}}
        />
        {toDoLists.map(tl => {

            function FilteredTasks(todoListId: string, value: FilterValueType) {
                const toDo = toDoLists.find(tl => tl.id === todoListId)
                if (toDo) {
                    tl.filter = value
                    setToDoLists([...toDoLists])
                }
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
                <div>
                    <TodoList
                        key={tl.id}
                        title={tl.title}
                        todoListId={tl.id}
                        tasks={tasksToShow}
                        RemoveTasks={RemoveTasks}
                        FilteredTasks={FilteredTasks}
                        AddNewTaskTitle={AddNewTaskTitle}
                        filtered={tl.filter}
                        removeTodo={removeTodo}
                        ChangeTaskStatus={ChangeTaskStatus}/>
                </div>

            )
        })}
    </div>
}

export default App;