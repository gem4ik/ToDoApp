import {combineReducers, createStore} from "redux";
import {ReducersTodo} from "./ReducersTodo";

const rootReducer = combineReducers({
    todolist: ReducersTodo,
    tasks: ReducersTodo
})

type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)