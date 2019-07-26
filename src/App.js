import React, { Component } from 'react'
import './App.css'

const todos = [
  'Learn React',
  'Learn Redux',
  'Learn React Native',
  'make a web app',
]

// .todo-item-row {
//   display: flex;
//   justify-content: space-between;
//   align-items: center
// }

// destructure on props children is always part of props
const TodoItem = ({ children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
    className='todo-item-row'
  >
    {children})
  </div>
)

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='todo-container'>
          <input id='new-todo' />
          <label htmlFor='new-todo' />
          {todos.map((todo, index) => (
            <TodoItem key={index}>{todo}</TodoItem>
          ))}
        </div>
      </div>
    )
  }
}

export default App
