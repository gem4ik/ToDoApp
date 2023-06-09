import React, {ChangeEvent, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {FilterValuesType} from "./reducers/ReducersTodo";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./reducers/Store";
import {AddTasksAC, ChangeStatusAC, ChangeTaskTitleAC, RemoveTasksAC, TasksStateType} from "./reducers/ReducersTasks";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksStateType>(store => store.tasks)

    const addTask = useCallback((title: string) => {
        dispatch(AddTasksAC(title, props.id))
    },[props.id, dispatch])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    },[props])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[props])

    let allTodolistTasks = tasks[props.id];
    let tasksForTodolist = allTodolistTasks;
    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props])


    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(RemoveTasksAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(ChangeStatusAC(t.id, e.currentTarget.checked, props.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(ChangeTaskTitleAC(t.id, newValue, props.id))
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}
                    color={'success'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            {/*<Button variant="contained" style={buttonStyles}>+</Button>*/}
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}
                    color={'error'}>Completed
            </Button>
        </div>
    </div>
})