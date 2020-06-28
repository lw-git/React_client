import React from 'react';
import Todo from "./Todo";


const TodoList = ({todos, prepareUpdate, removeTodo, flag}) => {
  return (
    todos.map(task => (
      <Todo key={task.id} task={task}
            prepareUpdate={prepareUpdate}
            removeTodo={removeTodo}
            flag={flag}
      />
    ))
  );
}

export default TodoList;