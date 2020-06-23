import React from 'react';
import Todo from "./Todo";


const TodoList = ({todos, prepareUpdate, removeTodo}) => {
  return (
    todos.map(task => (
      <Todo key={task.id} task={task}
            prepareUpdate={prepareUpdate}
            removeTodo={removeTodo}
      />
    ))
  );
}

export default TodoList;