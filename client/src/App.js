import React from 'react';
import TodoList from "./components/Todolist";
import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      todos: [],
      newTodoText: '',
      completed: false,
      todoId: null,
      updateFlag: false
    };
    this.instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/'
    });
  }

  componentDidMount(){
    this.getTodos();
  }

  setStateToNull = () => {
    this.setState({...this.state,
      newTodoText: '',
      completed: false,
      todoId: null,
      updateFlag: false})
  }

  getTodos = () => {
    this.instance.get()
      .then(res  => {
        this.setState({todos: res.data});
      })
      .catch(err => {
        console.log(err);
      });

  }

  addTodo = () => {
    this.instance.post('create/', {
      title: this.state.newTodoText,
      completed: this.state.completed
    })
      .then(()  => this.getTodos())
      .catch(err => {
        console.log(err);
      });
    this.setStateToNull()
  }

  updateTodo = () => {
    this.instance.patch(`${this.state.todoId}/update/`, {
      title: this.state.newTodoText,
      completed: this.state.completed
    })
      .then(()  => this.getTodos())
      .catch(err => {
        console.log(err);
      });
    this.setStateToNull()
  }

  prepareUpdate = (e) => {
    let completed = e.currentTarget.className.includes('strike');
    this.setState({...this.state,
      newTodoText: e.currentTarget.innerHTML,
      completed: completed,
      todoId: e.currentTarget.id.slice(5),
      updateFlag: true
    })    
  }

  onTextChange = (e) => {
    this.setState({...this.state, newTodoText: e.currentTarget.value});
  }

  onCompletedChange = (e) => {
    this.setState({...this.state, completed: e.currentTarget.checked});
  }
  removeTodo = (e) => {
    this.instance.delete(`${e.currentTarget.id}/delete/`)
      .then(() => this.getTodos())
      .catch(err => console.error(err));
  }

  render() {
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
                <input onChange={this.onCompletedChange}
                       type={"checkbox"}
                       checked={this.state.completed}
                />
                <div className={"add-items d-flex mb-4"}>
                  <input onChange={this.onTextChange} className={"form-control"}
                         type={"text"}
                         value={this.state.newTodoText}
                  />
                  <button onClick={this.state.updateFlag ? this.updateTodo : this.addTodo}
                          className={"btn btn-primary"}>
                    {this.state.updateFlag
                      ? 'Update'
                      : 'Create'}</button>
                </div>
                <TodoList todos={this.state.todos}
                          prepareUpdate={this.prepareUpdate}
                          removeTodo={this.removeTodo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
