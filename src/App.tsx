import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";

type FilterValueType = "All" | "Completed" | "Active"
function App() {

    let title = "Want to Create"
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'NativeJS', isDone: true},
        {id: 3, title: 'Redux', isDone: true},
        {id: 4, title: 'JS', isDone: true},
        {id: 5, title: 'React', isDone: false},
    ])
    let [filtered, setFiltered] = useState<FilterValueType>("All")
    function RemoveTasks(id: number) {
        let filteredTasks= tasks.filter(t => (t.id !== id))
        setTasks(filteredTasks)
    }
    function FilterTasks(value:FilterValueType) {
        setFiltered(value)
    }

    let taskToList = tasks
    if (filtered === "Completed") {
        taskToList = tasks.filter( t => t.isDone )
    } if (filtered === "Active"){
        taskToList = tasks.filter( t => !t.isDone )
    }


    return <div className="App">
        <TodoList tasks={taskToList}
                  RemoveTasks={RemoveTasks}
                  FilterTasks={FilterTasks}
                  title={title}/>
    </div>
}

export default App;