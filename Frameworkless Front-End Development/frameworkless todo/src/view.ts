import { Todo } from './common'

const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;

  return `
  <li ${completed ? 'class="completed"' : ''}>
    <div class="view">
      <input 
        ${completed ? 'checked' : ''}
        class="toggle" 
        type="checkbox">
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}">
  </li>`
}

const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter(todo => !todo.completed);

  const { length } = notCompleted;
  if(length === 1) {
    return '1 Item left';
  }

  return `${length} Items left`;
}

export default (targetElement, state)  => {
  const { currentFilter, todos } = state;
  const element = targetElement.cloneNode(true) as HTMLElement;

  const list = element.querySelector('.todo-list') as HTMLElement;
  const counter = element.querySelector('.todo-count') as HTMLElement;
  const filters = element.querySelector('.filters') as HTMLElement;

  list.innerHTML = todos.map(getTodoElement).join('');
  counter.textContent = getTodoCount(todos);

  let links: HTMLElement[] = Array.from(filters.querySelectorAll('li a'));
  links.forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected')
    } else {
      a.classList.remove('selected')
    }
  })

  return element;
}