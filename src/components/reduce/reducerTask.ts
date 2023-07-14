import {todolistId1, todolistId2} from "./reduceTodolist";
import {v1} from "uuid";
import {AddNewTodolistACType,RemoveTodolistACType} from"./reduceTodolist"


export type InitialTasksType={
[key:string]:TasksType[]
}
export type TasksType={
    id: string
    title: string
    isDone: boolean
}
const initialTasks:InitialTasksType= {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false}

    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ],
};


export const taskReduce=(state:InitialTasksType=initialTasks,action:rootTaskType):InitialTasksType=>{
    switch (action.type){
        case "ADD-NEW-TODOLIST":{
return {...state,[action.payload.newId]:[]}
    }
        case "REMOVE-TODOLIST":{
            let newState={...state}
            delete newState[action.payload.todolistId]
            return newState
        }
        case "ADD-NEW-TASK":{
            let newTask={id: v1(), title: action.payload.title, isDone: false}
            return {...state,[action.payload.todolistId]:[newTask,...state[action.payload.todolistId]]}
        }
        case "REMOVE-TASK":{

            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].filter(el=>el.id!==action.payload.taskId)}
        }
        case "NEW-CHECKED-STATUS":{
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map(el=>el.id===action.payload.taskId?{...el, isDone: !el.isDone}:el)}
        }
        case "NEW-TITLE-TASK":{
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map(el=>el.id===action.payload.taskId?{...el, title: action.payload.newTitle}:el)}
        }
        default: return state
    }
}

export type rootTaskType=AddNewTodolistACType|RemoveTodolistACType|AddNewTaskACType|RemoveTaskACType|newCheckedStatusACType|NewTitleTaskACType

export type AddNewTaskACType=ReturnType<typeof addNewTaskAC>
export const addNewTaskAC=(todolistId:string,title:string)=>{
    return{
        type:"ADD-NEW-TASK",
        payload:{todolistId,title}
    }as const
}
export type RemoveTaskACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC=(todolistId:string,taskId:string)=>{
    return{
        type:"REMOVE-TASK",
        payload:{todolistId,taskId}
    }as const
}
export type newCheckedStatusACType=ReturnType<typeof newCheckedStatusAC>
export const newCheckedStatusAC=(todolistId:string,taskId:string)=>{
    return{
        type:"NEW-CHECKED-STATUS",
        payload:{todolistId,taskId}
    }as const
}
export type NewTitleTaskACType=ReturnType<typeof newTitleTaskAC>
export const newTitleTaskAC=(todolistId:string,taskId:string,newTitle:string)=>{
    return{
        type:"NEW-TITLE-TASK",
        payload:{todolistId,taskId,newTitle}
    }as const
}