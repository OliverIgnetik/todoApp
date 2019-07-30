import React, { Component } from 'react'
import { Table, Input, Header } from 'semantic-ui-react'
import { TodoItem } from './TodoItem'
import { TableHeader } from './TableHeader'
import { Footer } from './Footer'

// headers for fetch request
const headers = {
  'Content-Type': 'application/json',
}
// data.json() and fetch are both asynchronous
fetch('http://localhost:3500/todos')
  .then(data => data.json())
  .then(data => console.log({ data }))
  .catch(err => console.log({ err }))

class TodoApp extends Component {
  // set state in a component
  state = {
    todos: [],
    newTodo: '',
  }

  fetchTodos = () => {
    fetch('http://localhost:3500/todos')
      .then(data => data.json())
      .then(todos => this.setState({ todos }))
      .catch(err => console.error({ err }))
  }

  componentDidMount() {
    this.fetchTodos()
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
    // fetch request
    if (value) {
      fetch('http://localhost:3500/todos', {
        method: 'POST',
        headers, //Using our headers variable
        // headers tell the fetch request what is the content
        body: JSON.stringify({
          title: value, //Grab the value from the input
          completed: false,
        }),
      })
        // once POST promise is resolved then get the todos
        .then(this.fetchTodos)
        // once fetch is completed reset to input
        .then(() => this.setState({ newTodo: '' }))
    }
  }

  handleActionKey = () => {
    if (this.state.todos.length >= 10) {
      // don't allow more than 10 todos
      return
    }
    const { newTodo, todos } = this.state //Destructure
    const value = newTodo.trim() //Get rid of white space at beginning and end
    // fetch request
    if (value) {
      fetch('http://localhost:3500/todos', {
        method: 'POST',
        headers, //Using our headers variable
        // headers tell the fetch request what is the content
        body: JSON.stringify({
          title: value, //Grab the value from the input
          completed: false,
        }),
      })
        // once POST promise is resolved then get the todos
        .then(this.fetchTodos)
        // once fetch is completed reset to input
        .then(() => this.setState({ newTodo: '' }))
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
        <Header as='h1' style={{ width: '100%', textAlign: 'center' }}>
          Todo List
        </Header>
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
          <TableHeader
            allToggled={allToggled}
            handleToggleAll={() => this.handleToggleAll()}
          />
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
          <Footer handleClearCompleted={() => this.handleClearCompleted()} />
        </Table>
      </div>
    )
  }
}

export default TodoApp
