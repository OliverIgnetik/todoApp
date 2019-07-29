import React, { Component } from 'react'
import { Table, Checkbox, Button, Input } from 'semantic-ui-react'
import {TodoItem} from './TodoItem'

class TodoApp extends Component {
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
  
    // check if all toggled
    handleToggleAll = () => {
      const [...todos] = this.state.todos
      const allToggled = todos.every(todo => todo.completed)
      const toggledTodos = todos.map(todo => ({
        ...todo,
        completed: !allToggled,
      }))
  
      this.setState({ todos: toggledTodos })
    }
  
    // best way to write class methods to avoid binding issues
    handleInputChange = event => {
      const value = event.target.value
      this.setState({ newTodo: value })
    }
  
    handleNewTodoKeyDown = event => {
      if (this.state.todos.length >= 10) {
        // don't allow more than 10 todos
        return
      }
      if (event.keyCode !== 13) {
        // 13 is enter key
        return
      }
      event.preventDefault()
      const { newTodo, todos } = this.state //Destructure
      const value = newTodo.trim() //Get rid of white space at beginning and end
      if (value) {
        //Check the value isn't blank
        this.setState({
          // append newTodo
          todos: [...todos, { title: value, completed: false }],
          //Finally clear the input field
          newTodo: '',
        })
      }
    }
  
    handleActionKey = () => {
      if (this.state.todos.length >= 10) {
        // don't allow more than 10 todos
        return
      }
      const { newTodo, todos } = this.state //Destructure
      const value = newTodo.trim() //Get rid of white space at beginning and end
      if (value) {
        //Check the value isn't blank
        this.setState({
          // append newTodo
          todos: [...todos, { title: value, completed: false }],
          //Finally clear the input field
          newTodo: '',
        })
      }
    }
  
    handleDelete = index => {
      const { todos } = this.state
      const todosWithoutDeletedTodo = todos.filter((t, i) => i !== index)
      this.setState({ todos: todosWithoutDeletedTodo })
    }
  
    handleClearCompleted = () => {
      const { todos } = this.state
      const incompleteTodos = todos.filter(todo => !todo.completed)
      this.setState({ todos: incompleteTodos })
    }
  
    render() {
      const { todos } = this.state
      const allToggled = todos.every(todo => todo.completed)
      return (
          <div className='todo-container'>
            <Input
              className='new-todo'
              action={{
                content: 'Add item',
                onClick: this.handleActionKey,
              }}
              placeholder='What do you need to do?'
              // needed to connect the model to the view
              value={this.state.newTodo}
              onChange={this.handleInputChange}
              onKeyDown={this.handleNewTodoKeyDown}
            />
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Checkbox
                      checked={allToggled}
                      onChange={this.handleToggleAll}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>Toggle all items</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.todos.map((todo, index) => (
                  <TodoItem
                    key={index}
                    todo={todo}
                    handleToggle={() => this.handleTodoClick(todo, index)}
                    handleDelete={() => this.handleDelete(index)}
                  />
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan='2'>
                    <Button size='small' onClick={this.handleClearCompleted}>
                      Clear completed
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
      )
    }
  }
  
  export default TodoApp
  