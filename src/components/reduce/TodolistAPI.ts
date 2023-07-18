import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    header: {
        'API-KEY': '31d3b244-d207-4062-b145-297089d8f2c1'
    }
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponceType<D> = {
    resultCode: number
    message: string[]
    data: D
}

export const TodolistAPI = {
    getData() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    post() {
        return instance.post<ResponceType<{item: TodolistType}>>('todo-lists',
            {title: "DDDDDDDDDDD"})
    },
    put() {
        const todolistId = 'c5e5250f-83d4-4eb0-88f5-b2debd14c5d5'
        return instance.put<ResponceType<{}>>(`todo-lists/${todolistId}`,
            {title: "EEEEEEEEE"},)
    },
    delete() {
        const todolistId = 'c5e5250f-83d4-4eb0-88f5-b2debd14c5d5'
        return instance.delete<ResponceType<{}>>(`todo-lists/${todolistId}`,)
    }
}