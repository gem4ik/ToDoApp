import React, { FC, useState, KeyboardEvent } from 'react';
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
  const OnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && OnClickNewTaskHandler();
  };
  let mappedTasks = tasks.map((t) => {
    const Removetask = () => {
      () => {
        RemoveTasks(t.id);
      };
    };
    return (
      <li>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={Removetask}>x</button>
      </li>
    );
  });

  const SetAll = () => {
    FilteredTasks('All');
  };
  const SetActive = () => {
    FilteredTasks('Active');
  };
  const SetCompleted = () => {
    FilteredTasks('Completed');
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={AddTitle}
          onChange={OnChangeAddTitleHandler}
          onKeyDown={(e) => OnKeyDownHandler(e)}
        />
        <button onClick={OnClickNewTaskHandler}>+</button>
      </div>
      <ul>{mappedTasks}</ul>
      <div>
        <button onClick={SetAll}>All</button>
        <button onClick={SetActive}>Active</button>
        <button onClick={SetCompleted}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
