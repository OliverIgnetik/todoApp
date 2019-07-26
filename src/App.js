import React, { Component } from 'react'
import './App.css'

const todos = [
  'Learn React',
  'Learn Redux',
  'Learn React Native',
  'make a web app',
]

let token = true;
class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='todo-container'>
          <input id='new-todo' />
          <label htmlFor="new-todo"></label>
          {todos.map((todo, index) => (
            <div key={index} className='todo-item-row'>
              {todo}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
