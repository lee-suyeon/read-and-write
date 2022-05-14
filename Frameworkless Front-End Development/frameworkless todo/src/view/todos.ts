import { Todo, State } from '../common'

// View function to Render the List
export const getTodoElement = (todo: Todo) => {
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

export default (targetElement: Node, { todos }: State) => {
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;
  const todosElements = todos.map(getTodoElement).join('');
  newTodoList.innerHTML = todosElements
  return newTodoList;
}