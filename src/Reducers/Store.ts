import {combineReducers, createStore} from "redux";
import {ReducersTodo} from "./ReducersTodo";
import {ReducersTasks} from "./ReducersTasks";

const rootReducer = combineReducers({
    todolist: ReducersTodo,
    tasks: ReducersTasks
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store