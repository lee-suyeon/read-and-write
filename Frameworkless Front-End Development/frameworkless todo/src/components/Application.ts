import { EVENTS } from './List';
import { Todo } from '../common';

interface State {
  todos: Todo[],
  filter: string
}

export default class App extends HTMLElement {
  private state: State;
  private template: HTMLElement;

  constructor() {
    super()
    this.state = {
      todos: [],
      filter: 'All'
    }

    this.template = document.getElementById('todo-app')!;
  }

  deleteItem(index: number) {
    this.state.todos.splice(index, 1);
    this.syncAttributes();
  }

  addItem(text: string) {
    this.state.todos.push({
      text,
      completed: false
    })
    this.syncAttributes();
  }

  syncAttributes() {
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.filter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const content = this.template.content.firstElementChild.cloneNode(true);
      this.appendChild(content);

      let newTodo = this.querySelector('.new-todo') as HTMLInputElement;
      newTodo.addEventListener('keypress', event => {
        let target = event.target as HTMLInputElement;
        if(event.key === "Enter") {
          this.addItem(target.value);
          target.value = "";
        }
      })

      this.footer = this.querySelector('todomvc-footer');
      this.list = this.querySelector('todomvc-list');
      this.list.addEventListener(EVENTS.DELETE_ITEM, event => {
        this.deleteItem(event.detail.index);
      })

      this.syncAttributes();
    })
  }
}