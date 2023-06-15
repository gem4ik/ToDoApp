import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ButtonAppBar} from "./ButtonAppBar";
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC,
    TodolistType
} from "./reducers/ReducersTodo";
import {
    AddTasksAC,
    AddTodoAc,
    ChangeStatusAC,
    ChangeTaskTitleAC,
    RemoveTasksAC,
    RemoveToDoAC, TasksStateType
} from "./reducers/ReducersTasks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./reducers/Store";


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(store => store.todolist)

    const tasks = useSelector<AppRootState, TasksStateType>(store => store.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(RemoveTasksAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatch(AddTasksAC(title, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(ChangeStatusAC(id, isDone, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(ChangeTaskTitleAC(id, newTitle, todolistId))
    }
//--------------------таски--------------------------------------
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(ChangeFilterAC(value,todolistId))
    }
    function removeTodolist(id: string) {
        dispatch(RemoveTodolistAC(id))
        dispatch(RemoveToDoAC(id))
    }
    function changeTodolistTitle(id: string, title: string) {
        dispatch(ChangeTodolistTitleAC(id, title))
    }
    function addTodolist(title: string) {
        let newTodolistId = v1();
        dispatch(AddTodolistAC(title, newTodolistId))
        dispatch(AddTodoAc(newTodolistId))
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