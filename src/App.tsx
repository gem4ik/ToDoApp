import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ButtonAppBar} from "./ButtonAppBar";
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    ReducersTodo,
    RemoveTodolistAC
} from "./reducers/ReducersTodo";
import {
    AddTasksAC,
    AddTodoAc,
    ChangeStatusAC,
    ChangeTaskTitleAC,
    ReducersTasks,
    RemoveTasksAC,
    RemoveToDoAC
} from "./reducers/ReducersTasks";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const initialTodo: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const initialTasks: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    let [todolists, dispatchTodolists] = useReducer(ReducersTodo, initialTodo)
    let [tasks, dispatchTasks] = useReducer(ReducersTasks, initialTasks)

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(RemoveTasksAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatchTasks(AddTasksAC(title, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(ChangeStatusAC(id, isDone, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTasks(ChangeTaskTitleAC(id, newTitle, todolistId))
    }
//--------------------таски--------------------------------------
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolists(ChangeFilterAC(value,todolistId))
    }
    function removeTodolist(id: string) {
        dispatchTodolists(RemoveTodolistAC(id))
        dispatchTasks(RemoveToDoAC(id))
    }
    function changeTodolistTitle(id: string, title: string) {
        dispatchTodolists(ChangeTodolistTitleAC(id, title))
    }
    function addTodolist(title: string) {
        let newTodolistId = v1();
        dispatchTodolists(AddTodolistAC(title, newTodolistId))
        dispatchTasks(AddTodoAc(newTodolistId))
    }
//------------тудулисты ----------------------------------------
    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed>
                <Grid container style={{padding: "30px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '15px'}} elevation={10}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
export default App