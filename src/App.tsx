import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";

export type FilterValueType = "All" | "Completed" | "Active"
function App() {

    let title = "Want to Create"
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: false},
        {id: 2, title: 'NativeJS', isDone: false},
        {id: 3, title: 'Redux', isDone: false},
        {id: 4, title: 'JS', isDone: false},
        {id: 5, title: 'React', isDone: false}
    ])
    let [filtered, setFiltered] = useState<FilterValueType>("All")

    function RemoveTasks(id: number) {
        let filteredTasks= tasks.filter(t => (t.id !== id))
        setTasks(filteredTasks)
    }
    function FilteredTasks(value: FilterValueType) {
        setFiltered(value)}

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
        />
    </div>
}

export default App;