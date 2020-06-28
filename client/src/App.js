import React, {useState, useEffect} from 'react';
import TodoList from "./components/Todolist";
import Preloader from "./components/Preloader";
import Error from "./components/Error";
import axios from 'axios';


const App = () => {
  const [todoText, setTodoText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('')

  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
  });

  // eslint-disable-next-line
  useEffect(() => { getTodos() }, []);

  const setStateToNull = () => {
    setTodoText('');
    setCompleted(false);
    setTodoId(null);
    setUpdateFlag(false);
  }

  const handleError = (err) => {
    setLoading(false);
    setShowError(true);
    setErrorText(err.toString());
  }
  const hideError = () => {
    setShowError(false);
  }

  const prepareUpdate = (e) => {
    setTodoText(e.currentTarget.innerHTML);
    setCompleted(e.currentTarget.className.includes('strike'));
    setTodoId(e.currentTarget.id.slice(5));
    setUpdateFlag(true);
  }

  const getTodos = () => {
    instance.get()
      .then(res  => setTodos(res.data))
      .catch(err => handleError(err));
    setLoading(false);
  }

  const addTodo = () => {
    setLoading(true);
    instance.post('create/', {
      title: todoText,
      completed: completed
    })
      .then(()  => getTodos())
      .catch(err => handleError(err));
    setStateToNull()
  }

  const updateTodo = () => {
    setLoading(true);
    instance.patch(`${todoId}/update/`, {
      title: todoText,
      completed: completed
    })
      .then(()  => getTodos())
      .catch(err => handleError(err));
    setStateToNull()
  }

  const removeTodo = (e) => {
    setLoading(true);
    instance.delete(`${e.currentTarget.id}/delete/`)
      .then(() => getTodos())
      .catch(err => handleError(err));
  }

  const onTextChange = (e) => {setTodoText(e.currentTarget.value)};
  const onCompletedChange = (e) => {setCompleted(e.currentTarget.checked)};

  return (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-lg-8 mx-auto'}>
          <div className={'card'}>
            <div className={'card-header bg-primary text-white'}>
              <h1>Todo:</h1>
            </div>
            <div className={'card-body'}>
              Completed:&nbsp;
              <input onChange={onCompletedChange}
                     type={"checkbox"}
                     checked={completed}
              />
              <div className={"add-items d-flex mb-4"}>
                <input onChange={onTextChange} className={"form-control"}
                       type={"text"}
                       value={todoText}
                />
                <button onClick={updateFlag ? updateTodo : addTodo}
                        className={"btn btn-primary"}>
                  {updateFlag
                    ? 'Update'
                    : 'Create'}</button>
              </div>
              {showError ?
                <Error text={errorText} hideError={hideError} timeout={3000} />: null}
              {loading ? <Preloader/> :
                <TodoList todos={todos}
                          prepareUpdate={prepareUpdate}
                          removeTodo={removeTodo}
                          flag={updateFlag} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
