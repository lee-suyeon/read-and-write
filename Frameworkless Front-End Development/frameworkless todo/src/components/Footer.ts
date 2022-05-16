import { Todo } from '../common';

const getTodoCount = (todos: Todo[]): string => {
  const notCompleted = todos.filter(todo => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return '1 Item left'
  }

  return `${length} Items left`
}

export default class Footer extends HTMLElement {
  static get observedAttributes () {
    return [
      'filter',
      'todos'
    ]
  }

  get todos () {
    if (!this.hasAttribute('todos')) {
      return []
    }

    return JSON.parse(this.getAttribute('todos')!)
  }

  set todos (value) {
    this.setAttribute('todos', JSON.stringify(value))
  }

  get filter () {
    return this.getAttribute('filter')!
  }

  set filter (value: string) {
    this.setAttribute('filter', value)
  }

  connectedCallback () {
    const template = document.getElementById('footer') as HTMLElement;
    const content = template.content.firstElementChild.cloneNode(true)

    this.appendChild(content)

    const { filter, todos } = this

    this.querySelectorAll('li a')
      .forEach(a => {
        if (a.textContent === filter) {
          a.classList.add('selected')
        } else {
          a.classList.remove('selected')
        }
      })

    const label = getTodoCount(todos)

    const todoCount = this.querySelector('span.todo-count')!
    todoCount.textContent = label
  }
}