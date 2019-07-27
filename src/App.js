import React, { Component } from 'react'
import { Table, Checkbox, Button, Input } from 'semantic-ui-react'
import './App.css'

// const todos = [
//   'Learn React',
//   'Learn Redux',
//   'Learn React Native',
//   'Make a web app',
// ]

// construct TodoItem
const TodoItem = props => (
  <Table.Row>
    <Table.Cell>
      <Checkbox />
    </Table.Cell>
    <Table.Cell>
      {props.children}
      <Button color='red' icon='trash' floated='right' compact size='small' />
    </Table.Cell>
  </Table.Row>
)

class Counter extends Component {
  state = { counter: 0 }
  render() {
    return (
      <button
        onClick={() => {
          // set state to change the state of the counter
          this.setState({
            counter: this.state.counter + 1,
          })
        }}
      >
        You have clicked {this.state.counter} times
      </button>
    )
  }
}
class App extends Component {
  // set state in a component
  state = {
    todos: [
      'Learn React',
      'Learn Redux',
      'Learn React Native',
      'Make a web app',
    ],
  }
  render() {
    return (
      <div className='app'>
        <div className='todo-container'>
          <Counter />
          <Input
            className='new-todo'
            action='Add Item'
            placeholder='What do you need to do?'
          />
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Checkbox />
                </Table.HeaderCell>
                <Table.HeaderCell>Toggle all items</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.todos.map((todo, index) => (
                <TodoItem key={index}>{todo}</TodoItem>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    )
  }
}

export default App
