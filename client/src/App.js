import React from 'react';
import TodoList from "./components/Todolist";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      todos: [
        {'id': 1, title: 'first todo', completed: false},
        {'id': 2, title: 'second todo', completed: true},
        {'id': 3, title: 'third todo', completed: false},
      ],
      newTodoText: '',
      completed: false
    };
  }

  componentDidMount(){

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
                <input type={"checkbox"}
                />
                <div className={"add-items d-flex mb-4"}>
                  <input className={"form-control"}
                         type={"text"}
                  />
                  <button className={"btn btn-primary"}>Create
                  </button>
                </div>
                <div>
                  <div>
                    <TodoList todos={this.state.todos} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
