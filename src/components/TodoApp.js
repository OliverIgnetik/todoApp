import React, { Component } from 'react'
import { Table, Input, Header } from 'semantic-ui-react'
import { TodoItem } from './TodoItem'
import { TableHeader } from './TableHeader'
import { Footer } from './Footer'

// headers for fetch request
const headers = {
  'Content-Type': 'application/json',
}

class TodoApp extends Component {
  // set state in a component
  state = {
    todos: [],
    newTodo: '',
  }

  fetchTodos = () => {
    fetch('/todos')
      .then(data => data.json())
      .then(todos => this.setState({ todos }))
      .catch(err => console.error({ err }))
  }

  componentDidMount() {
    this.fetchTodos()
  }

  // component method
  handleTodoClick = (todo) => {
    const { completed,id } = todo
    fetch(`/todos/${id}`, {
      // PATCH just updates but does not delete the old entry
      method: 'PATCH',
      headers,
      // toggle the completed state
      body: JSON.stringify({ completed: !completed }),
    }).then(this.fetchTodos)
  }

  // check if all toggled
  handleToggleAll = allToggled => {
    const { todos } = this.state
    Promise.all(
      todos.map(todo =>
        fetch(`/todos/${todo.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ completed: !allToggled }),
        }),
      ),
    ).then(this.fetchTodos)
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
    const { newTodo} = this.state //Destructure
    const value = newTodo.trim() //Get rid of white space at beginning and end
    // fetch request
    if (value) {
      fetch('/todos', {
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
    const { newTodo} = this.state //Destructure
    const value = newTodo.trim() //Get rid of white space at beginning and end
    // fetch request
    if (value) {
      fetch('/todos', {
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

  handleDelete = id => {
    fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers,
    }).then(this.fetchTodos)
  }

  handleClearCompleted = () => {
    const { todos } = this.state
    const completedTodos = todos.filter(
      todo => todo.completed,
    )
    // once all of the promises are completed 
    Promise.all(
      // map this fetch function over each todo 
      completedTodos.map(todo =>
        fetch(`/todos/${todo.id}`, {
          method: 'DELETE',
          headers,
        }),
      ),
      // once all the completed todos are deleted fetch the todos 
    ).then(this.fetchTodos)
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
            handleToggleAll={() => this.handleToggleAll(allToggled)}
          />
          <Table.Body>
            {this.state.todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                handleToggle={() => this.handleTodoClick(todo)}
                handleDelete={() => this.handleDelete(todo.id)}
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
