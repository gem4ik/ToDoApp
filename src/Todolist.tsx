import React, { FC, useState } from 'react';
import { FilterValueType } from './App';

export type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  RemoveTasks: (id: string) => void;
  FilteredTasks: (value: FilterValueType) => void;
  AddTask: (e: any) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

const TodoList: FC<TodoListPropsType> = ({
  title,
  tasks,
  FilteredTasks,
  RemoveTasks,
  AddTask,
}) => {
  let [AddTitle, setAddTitle] = useState('');

  const OnChangeAddTitleHandler = (e: any) => {
    setAddTitle(e.currentTarget.value);
  };
  const OnClickNewTaskHandler = () => {
    AddTask(AddTitle);
    setAddTitle('');
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={AddTitle} onChange={OnChangeAddTitleHandler} onKeyDown={(e) => {
            if (e.key === 'Enter') OnChangeAddTitleHandler; 
          }}/>
        <button
          onClick={OnClickNewTaskHandler}
          
        >
          +
        </button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button
              onClick={() => {
                RemoveTasks(t.id);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            FilteredTasks('All');
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            FilteredTasks('Active');
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            FilteredTasks('Completed');
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
