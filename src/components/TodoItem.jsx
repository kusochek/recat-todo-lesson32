import { Component } from "react";

export default class TodoItem extends Component {
  constructor() {
    super();
    console.log("TODO ITEM CONSTRUCTOR");
  }

  render() {
    const { title, id, completed } = this.props.item;
    return (
      <li
        style={{ backgroundColor: getStyle(completed)}}
        onClick={() => this.props.setCompletedTodo(id)}
      >
        {title}
        <button
          onClick={e => {
            e.stopPropagation();
            this.props.onDeleteItemButton(id);
          }}
        >
          Delete
        </button>
      </li>
    )
  }

  componentDidMount() {
    setInterval(() => console.log("Hello"), 2000);
    console.log("TODO ITEM DID MOUNT");
  }

  componentWillUnmount() {
    console.log("TODO ITEM WILL UNMOUNT");
  }
}

function getStyle(completed) {
  return completed ? "lightblue" : "yellow";
}
