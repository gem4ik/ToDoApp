import {v1} from "uuid";

export let todolistId1 = v1()
export let todolistId2 = v1()


export type FilterType="All"|"Active"|"Completed"
export type InitialTodolistType={
    id:string
    title:string
    filter:FilterType
}
const initialTodolist:InitialTodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
]


export const todolistReduce=(state:InitialTodolistType[]=initialTodolist,action:RootTodolistsType):InitialTodolistType[]=>{
    switch (action.type){
        case "ADD-NEW-TODOLIST":{
            return [...state,{id: action.payload.newId, title: action.payload.title, filter: "All"}]
        }
        case "REMOVE-TODOLIST":{
            return state.filter(el=>el.id!==action.payload.todolistId)
        }
        case "NEW-TITLE-TODO":{
            return state.map(el=>el.id===action.payload.todolistId?{...el, title: action.payload.newTitleTodo}:el)
        }
        case "NEW-STATUS-FILTER":{
            return state.map(el=>el.id===action.payload.todolistId?{...el, filter: action.payload.newStatusFilter}:el)
        }
        default: return state
    }
}


export type RootTodolistsType=
    AddNewTodolistACType|
    RemoveTodolistACType|
    NewTitleTodoACType|
    NewStatusFilterACType
export type AddNewTodolistACType=ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC=(title:string)=>{
    return{
        type:"ADD-NEW-TODOLIST",
        payload:{title,newId:v1()}
    }as const
}
export type RemoveTodolistACType=ReturnType<typeof removeTodolistAC>
export const removeTodolistAC=(todolistId:string)=>{
    return{
        type:"REMOVE-TODOLIST",
        payload:{todolistId}
    }as const
}
export type NewTitleTodoACType=ReturnType<typeof newTitleTodoAC>
export const newTitleTodoAC=(todolistId:string,newTitleTodo:string)=>{
    return{
        type:"NEW-TITLE-TODO",
        payload:{todolistId,newTitleTodo}
    }as const
}
export type NewStatusFilterACType=ReturnType<typeof newStatusFilterAC>
export const newStatusFilterAC=(todolistId:string,newStatusFilter:FilterType)=>{
    return{
        type:"NEW-STATUS-FILTER",
        payload:{todolistId,newStatusFilter}
    }as const
}