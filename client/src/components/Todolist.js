import React from 'react';
import Todo from "./Todo";


const TodoList = ({todos}) => {
  return (
    todos.map(task => (
      <Todo key={task.id} task={task}  />
    ))
  );
}

export default TodoList;