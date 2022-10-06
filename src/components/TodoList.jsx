import { Component } from "react";
import TodoItem from "./TodoItem";
import { API_URL } from "../constants";

export default class TodoList extends Component {
  state = {
    todos: [],
    title: "",
  }

  constructor() {
    super();
    this.onDeleteItemButton = this.onDeleteItemButton.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitButtonClick = this.submitButtonClick.bind(this);
    this.setCompletedTodo = this.setCompletedTodo.bind(this);
    console.log("TODO LIST CONSTRUCTOR");
  }

  render() {
    console.log("TODO LIST RENDER");
    return (
      <>
        <ul>
          {this.state.todos.map(todo => (
              <TodoItem
                key={todo.id}
                item={todo}
                onDeleteItemButton={this.onDeleteItemButton}
                setCompletedTodo={this.setCompletedTodo}
              />
          ))}
        </ul>
        <form>
          <fieldset>
            <legend>Enter new todo</legend>
            <input
              type="text"
              title={this.state.title}
              onChange={this.onInputChange}
            />
            <button onClick={this.submitButtonClick}>Add</button>
          </fieldset>
        </form>
      </>
    )
  }

  onInputChange(e) {
    this.setState({ title: e.target.value });
  }

  submitButtonClick(e) {
    e.preventDefault();
    const newItem = {
      title: this.state.title,
      completed: false,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then(resp => resp.json())
      .then(data => this.setState({ todos: [...this.state.todos, data], title: "" }))
  }

  onDeleteItemButton(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const newTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos});
  }

  setCompletedTodo(id) {
    const item = this.state.todos.find(todo => todo.id === id);
    const newItem = { ...item, completed: !item.completed };

    console.log(item, newItem);
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    this.setState({
      todos: this.state.todos.map(item => item.id === id ? newItem : item)
    });
  }

  componentDidMount() {
    console.log("TODO LIST DID MOUNT");
    fetch(API_URL)
      .then(resp => resp.json())
      .then(data => this.setState({ todos: data }));
  }

  componentWillUnmount() {
    console.log("TODO LIST WILL UNMOUNT");
  }
}