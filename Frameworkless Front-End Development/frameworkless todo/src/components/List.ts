import { Todo } from '../common'

const TEMPLATE = '<ul class="todo-list"></ul>';

export const EVENTS = {
  DELETE_ITEM: 'DELETE_ITEM'
}

export default class List extends HTMLElement {
  static get observedAttributes() {
    return [
      'todos'
    ]
  }

  get todos() {
    if(!this.hasAttribute('todos')) {
      return [];
    } else {
      return JSON.parse(this.getAttribute('todos')!);
    }
  }

  set todos(value) {
    this.setAttribute('todos', JSON.stringify(value));
  }

  onDeleteClick(index: number) {
    const event = new CustomEvent(
      EVENTS.DELETE_ITEM,
      {
        detail: {
          index
        }
      }
    )
    this.dispatchEvent(event);
  }

  createNewTodoNode() {
    return this.itemTemplate.content.firstElementChild.cloneNode(true);
  }

  getTodoElement(todo: Todo, index: number): HTMLElement {
    const { text, completed } = todo;
    
    const element = this.createNewTodoNode();
    element.querySelector('input.edit').value = text;
    element.querySelector('label').textContent = text;

    if(completed) {
      element.classList.add('completed')
      element.querySelector('input.toggle').checked = true;
    }

    const deleteButton = element.querySelector('button.destroy') as HTMLButtonElement;
    deleteButton.dataset.index = index.toString();

    return element;
  }

  updateList() {
    this.list.innerHTML = "";

    this.todos.map(this.getTodoElement).forEach(element => {
      this.list.appendChild(element);
    })
  }

  connectedCallback() {
    this.innerHTML = TEMPLATE;
    this.itemTemplate = document.getElementById('todo-item');
    this.list = this.querySelector('ul');
    console.log('this', this)
    console.log('this.itemTemplate', this.itemTemplate)
    console.log('this.list', this.list)
    this.list.addEventListener('click', e => {
      const target = e.target;
      if(target.matches('button.destroy')) {
        this.onDeleteClick(target.dataset.index);
      }
    })
    this.updateList();
  }

  attributeChangedCallback() {
    this.updateList();
  }
}