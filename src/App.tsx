import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "All" | "Completed" | "Active"
function App() {

    let title = "Want to Create"
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'NativeJS', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ])
    let [filtered, setFiltered] = useState<FilterValueType>("All")

    function RemoveTasks(id: string) {
        let filteredTasks= tasks.filter(t => (t.id !== id))
        setTasks(filteredTasks)
    }
    function FilteredTasks(value: FilterValueType) {
        setFiltered(value)}
    function AddNewTaskTitle(newTask: string) {
    let newAddedTask = {id: v1(), title: newTask, isDone: false }
        let newTasks = [newAddedTask, ...tasks]
        setTasks(newTasks)
    }

        let tasksToShow = tasks
        if (filtered === "Completed") {
            tasksToShow = tasks.filter((t) => t.isDone)
        }
        if (filtered === "Active") {
            tasksToShow = tasks.filter((t) => !t.isDone)
        }


    return <div className="App">
        <TodoList tasks={tasksToShow}
                  RemoveTasks={RemoveTasks}
                  title={title}
                  FilteredTasks={FilteredTasks}
                  AddNewTaskTitle={AddNewTaskTitle}
                  filtered={filtered}
        />
    </div>
}

export default App;