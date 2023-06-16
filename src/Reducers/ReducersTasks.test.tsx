import {
    ReducersTasks,
    RemoveTasksAC,
    AddTasksAC,
    ChangeStatusAC,
    ChangeTaskTitleAC,
    RemoveToDoAC,
    AddTodoAc,
    TasksStateType
} from './ReducersTasks';

test('ReducersTasks', () => {
    let startState: TasksStateType;

    beforeEach(() => {
        startState = {
            todolistId1: [
                { id: '1', title: 'Learn React', isDone: false },
                { id: '2', title: 'Learn Redux', isDone: false },
                { id: '3', title: 'Learn Typescript', isDone: false },
            ],
            todolistId2: [
                { id: '1', title: 'Buy Milk', isDone: false },
                { id: '2', title: 'Buy Bread', isDone: false },
                { id: '3', title: 'Buy Eggs', isDone: false },
            ],
        };
    });

    it('should remove task from the correct todolist', () => {
        const action = RemoveTasksAC('2', 'todolistId2');
        const endState = ReducersTasks(startState, action);

        expect(endState.todolistId1.length).toBe(3);
        expect(endState.todolistId2.length).toBe(2);
        expect(endState.todolistId2.every((t) => t.id !== '2')).toBeTruthy();
        expect(endState).not.toBe(startState);
    });

    it('should add task to the correct todolist', () => {
        const action = AddTasksAC('Learn Jest', 'todolistId1');
        const endState = ReducersTasks(startState, action);

        expect(endState.todolistId1.length).toBe(4);
        expect(endState.todolistId2.length).toBe(3);
        expect(endState.todolistId1[0].title).toBe('Learn Jest');
        expect(endState).not.toBe(startState);
    });

    it('should change task status in the correct todolist', () => {
        const action = ChangeStatusAC('2', true, 'todolistId2');
        const endState = ReducersTasks(startState, action);

        expect(endState.todolistId1.length).toBe(3);
        expect(endState.todolistId2.length).toBe(3);
        expect(endState.todolistId2[1].isDone).toBeTruthy();
        expect(endState).not.toBe(startState);
    });

    it('should change task title in the correct todolist', () => {
        const action = ChangeTaskTitleAC('2', 'Buy Brown Bread', 'todolistId2');
        const endState = ReducersTasks(startState, action);

        expect(endState.todolistId1.length).toBe(3);
        expect(endState.todolistId2.length).toBe(3);
        expect(endState.todolistId2[1].title).toBe('Buy Brown Bread');
        expect(endState).not.toBe(startState);
    });

    it('should remove todolist from the state', () => {
        const action = RemoveToDoAC('todolistId1');
        const endState = ReducersTasks(startState, action);

        expect(endState.todolistId1).toBeUndefined();
        expect(endState.todolistId2.length).toBe(3);
        expect(endState).not.toBe(startState);
    });

    it('should add todolist to the state', () => {
        const action = AddTodoAc('todolistId3');
        const endState = ReducersTasks(startState, action);

        expect(endState.todolistId1.length).toBe(3);
        expect(endState.todolistId2.length).toBe(3);
        expect(endState.todolistId3.length).toBe(0);
        expect(endState).not.toBe(startState);
    });
});
