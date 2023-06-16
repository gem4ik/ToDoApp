import {
    ReducersTodo,
    ChangeFilterAC,
    RemoveTodolistAC,
    ChangeTodolistTitleAC,
    AddTodolistAC,
    TodolistType
} from './ReducersTodo';

let startState: TodolistType[];

beforeEach(() => {
    startState = [
        {id: '1', title: 'first todolist', filter: 'all'},
        {id: '2', title: 'second todolist', filter: 'all'}
    ];
});

test('filter of the todolist should be changed', () => {
    const action = ChangeFilterAC('completed', '2');

    const endState = ReducersTodo(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');

    // update startState
    startState = endState;
});

test('todolist should be removed', () => {
    const action = RemoveTodolistAC('1');

    const endState = ReducersTodo(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe('2');

    // update startState
    startState = endState;
});

test('todolist should have its title changed', () => {
    const action = ChangeTodolistTitleAC('1', 'new title');

    const endState = ReducersTodo(startState, action);

    expect(endState[0].title).toBe('new title');
    expect(endState[1].title).toBe('second todolist');

    // update startState
    startState = endState;
});

test('new todolist should be added', () => {
    const action = AddTodolistAC('new todolist', '3');

    const endState = ReducersTodo(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].id).toBeDefined();
    expect(endState[2].title).toBe('new todolist');
    expect(endState[2].filter).toBe('all');

    // update startState
    startState = endState;
});
