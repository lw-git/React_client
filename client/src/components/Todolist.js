import React from 'react';
import Todo from "./Todo";


const TodoList = ({todos, prepareUpdate}) => {
  return (
    todos.map(task => (
      <Todo key={task.id} task={task}
            prepareUpdate={prepareUpdate}            
      />
    ))
  );
}

export default TodoList;