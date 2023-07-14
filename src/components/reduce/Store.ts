import {combineReducers, createStore} from "redux";
import {todolistReduce} from "./reduceTodolist";
import {taskReduce} from "./reducerTask";

export type RootReduceType=ReturnType<typeof rootReduce>
export const rootReduce=combineReducers({
    todolist:todolistReduce,
    task:taskReduce
})

export const store= createStore(rootReduce)