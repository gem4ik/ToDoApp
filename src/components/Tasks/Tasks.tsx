import React from 'react';
import {FilterType} from "../reduce/reduceTodolist";
import {useSelector} from "react-redux";
import {RootReduceType} from "../reduce/Store";
import {TasksType} from "../reduce/reducerTask";
import {Task} from "../Task/Task";

export type TasksPropsType = {
    todolistId: string
    filterStatus: FilterType
}


export const Tasks = (props: TasksPropsType) => {
        let {todolistId, filterStatus} = props
        const tasks = useSelector<RootReduceType, TasksType[]>(state => state.task[todolistId])
        let filterTasks = tasks

        if (filterStatus === "Completed") {
            filterTasks = tasks.filter(el => el.isDone)
        }
        if (filterStatus === "Active") {
            filterTasks = tasks.filter(el => !el.isDone)
        }

        return (
            <div>
                {
                    filterTasks.map(el => {
                        return (
                            <Task key={el.id} checked={el.isDone} title={el.title} todolistId={todolistId} taskId={el.id}/>
                        )
                    })
                }
            </div>
        );
    }
;

