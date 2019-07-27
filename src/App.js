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
  }
  render() {
    return (
      <div className='app'>
        <div className='todo-container'>
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
                <Table.Row key={index} positive={todo.completed}>
                  <Table.Cell>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => {
                        const { completed } = todo
                        const [...todos] = this.state.todos
                        todos[index] = { ...todo, completed: !completed }
                        this.setState({todos:todos})
                      }}
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
