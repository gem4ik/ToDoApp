import React, {useCallback} from 'react';
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
    ChangeTodolistTitleAC,
    FilterValuesType,
    RemoveTodolistAC,
    TodolistType
} from "./reducers/ReducersTodo";
import {AddTodoAc, RemoveToDoAC} from "./reducers/ReducersTasks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./reducers/Store";


export const App = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(store => store.todolist)

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeFilterAC(value, todolistId))
    }, [])
    const removeTodolist = useCallback((id: string) => {
        dispatch(RemoveTodolistAC(id))
        dispatch(RemoveToDoAC(id))
    }, [])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title))
    }, [])
    const addTodolist = useCallback((title: string) => {
        let newTodolistId = v1();
        dispatch(AddTodolistAC(title, newTodolistId))
        dispatch(AddTodoAc(newTodolistId))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "30px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '15px'}} elevation={10}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
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