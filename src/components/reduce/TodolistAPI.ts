import axios from "axios";

export const settings = {
    withCredentials: true,
    header: {
        'API-KEY': '31d3b244-d207-4062-b145-297089d8f2c1'
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type CreateTodolistResponceType ={
    resultCode: number
    message: string[]
    data: {
        item: TodolistType
    }
}
export type DeleteTodolistResponceType ={
    resultCode: number
    message: string[]
    data: {}
}
export type UpdateTodolistResponceType ={
    resultCode: number
    message: string[]
    data: {}
}
export const TodolistAPI = {
    getData() {
        return axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1//todo-lists', settings)
    },
    post() {
        return axios.post<CreateTodolistResponceType>('https://social-network.samuraijs.com/api/1.1//todo-lists',
            {title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},
            settings)
    },
    put() {
        const todolistId = 'b3d0b4d2-4d0c-4f04-9ba5-a7c60f384b4d'
        return axios.put<UpdateTodolistResponceType>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`,
            {title: "CCCCCCCCCCCCCCC"},
            settings)
    },
    delete() {
        const todolistId = 'b3d0b4d2-4d0c-4f04-9ba5-a7c60f384b4d'
        return axios.delete<DeleteTodolistResponceType>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`,
            settings)
    }
}