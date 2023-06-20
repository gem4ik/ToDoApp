
import {v1} from "uuid";

export const  todolistId1 = v1();
export const  todolistId2 = v1();

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


const initialTodo: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const ReducersTodo =(state: TodolistType[] = initialTodo, action: tsarType): TodolistType[]=> {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            let todolist = state.find(tl => tl.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.value;
            }
            return [...state]
        }
        case 'REMOVE-TODO': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title;
            }
            return [...state]
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistType = {id: action.payload.newTodolistId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        default: return state
    }
}

type tsarType = ChangeFilterACType | RemoveTodolistACType | ChangeTodolistTitleACType | AddTodolistACType

export type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>
export const ChangeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {value, todolistId}
    } as const
}

export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODO',
        payload: {id}
    } as const
}

export type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export const ChangeTodolistTitleAC = (id: string, title: string)=> {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {id, title}
    }as const
}

export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (title: string, newTodolistId: string)=> {
    return {
        type: "ADD-TODOLIST",
        payload: {title, newTodolistId}
    }as const
}

