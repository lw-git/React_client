import React from 'react';


class App extends React.Component {

  constructor(props){
    super(props)
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
