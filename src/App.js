import React, { Component } from 'react'
import { Table, Checkbox, Button, Input } from 'semantic-ui-react'
import './App.css'

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

class App extends Component {
  // set state in a component
  state = {
    todos: [
      { title: 'Learn React', completed: false },
      { title: 'Learn Redux', completed: false },
      { title: 'Learn React Native', completed: false },
      { title: 'Learn to make a web app', completed: false },
    ],
    newTodo: '',
  }

  // component method
  handleTodoClick = (todo, index) => {
    const { completed } = todo
    const [...todos] = this.state.todos
    todos[index] = { ...todo, completed: !completed }
    this.setState({ todos: todos })
  }

  // best way to write class methods to avoid binding issues
  handleInputChange = event => {
    const value = event.target.value
    this.setState({ newTodo: value })
  }

  render() {
    return (
      <div className='app'>
        <div className='todo-container'>
          <Input
            className='new-todo'
            action='Add Item'
            placeholder='What do you need to do?'
            // needed to connect the model to the view
            value={this.state.newTodo}
            onChange={this.handleInputChange}
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
                <Table.Row key={index} positive={todo.completed}>
                  <Table.Cell>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => this.handleTodoClick(todo, index)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {todo.title}
                    <Button
                      color='red'
                      icon='trash'
                      floated='right'
                      compact
                      size='small'
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    )
  }
}

export default App
