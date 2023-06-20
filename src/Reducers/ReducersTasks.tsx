import {v1} from "uuid";
import {todolistId1, todolistId2} from "./ReducersTodo";
import {TaskType} from "../Todolist";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialTask: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const ReducersTasks = (state: TasksStateType = initialTask, action: tsarType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.id);
            return {...state}
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = [task, ...todolistTasks];
            return {...state}
        }
        case "CHANGE-STATUS": {
            let todolistTasks = state[action.payload.todolistId];
            let task = todolistTasks.find(t => t.id === action.payload.id);
            if (task) {
                task.isDone = action.payload.isDone;
            }
            return {...state}
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.payload.todolistId];
            let task = todolistTasks.find(t => t.id === action.payload.id);
            if (task) {
                task.title = action.payload.newTitle;
            }
            return {...state}
        }
        case "REMOVE-TODO": {
            delete state[action.payload.id]
            return {...state}
        }
        case "ADD-TODO": {
            return {...state, [action.payload.newTodolistId]: []}
        }
        default:
            return state
    }
}

type tsarType = RemoveTasksACType | AddTasksACType | ChangeStatusACType | ChangeTaskTitleACType | RemoveToDoACType | AddTodoAcType

export type RemoveTasksACType = ReturnType<typeof RemoveTasksAC>
export const RemoveTasksAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistId}
    } as const
}

export type AddTasksACType = ReturnType<typeof AddTasksAC>
export const AddTasksAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}

export type ChangeStatusACType = ReturnType<typeof ChangeStatusAC>
export const ChangeStatusAC = (id: string, isDone: boolean, todolistId: string)=> {
    return {
        type: "CHANGE-STATUS",
        payload: {id, isDone, todolistId}
    }as const
}

export type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export const ChangeTaskTitleAC = (id: string, newTitle: string, todolistId: string)=> {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {id, newTitle, todolistId}
    }as const
}

export type RemoveToDoACType = ReturnType<typeof RemoveToDoAC>
export const RemoveToDoAC = (id: string)=> {
    return {
        type: "REMOVE-TODO",
        payload: {id}
    }as const
}

export type AddTodoAcType = ReturnType<typeof AddTodoAc>
export const AddTodoAc = (newTodolistId: string)=> {
    return {
        type: "ADD-TODO",
        payload: {newTodolistId}
    }as const
}