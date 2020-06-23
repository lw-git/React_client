import React from 'react';
import styles from './Todo.module.css';

const Todo = ({task, removeTodo, prepareUpdate}) => {
  return (
    <div className={"alert alert-primary alert-dismissible text-center"}>
      <button className={"close"} type={"button"}>
        <span id={task.id} onClick={removeTodo} aria-hidden="true">×</span>
      </button>
      <p id={`text_${task.id}`}
         className={`text-center h4 ${task.completed ? styles.strike : undefined}`}
         style={{cursor:'pointer', display: 'block'}}
         onClick={prepareUpdate}>{task.title}</p>
    </div>
  )
}

export default Todo;