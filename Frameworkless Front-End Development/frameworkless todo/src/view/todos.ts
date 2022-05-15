import { Todo, State, Events } from '../common'

let template: any;

const createNewTodoNode = () => {
  if(!template) {
    template = document.getElementById('todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
}

// View function to Render the List
const getTodoElement = (todo: Todo, index: number, events: Events) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();
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

export default (targetElement: Node, state: State, events: Events) => {
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;
  const { todos } = state;
  const { deleteItem } = events;

  newTodoList.innerHTML = '';
  todos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach(element => {
      newTodoList.appendChild(element)
    })

    newTodoList.addEventListener('click', e => {
      let eventTarget = e.target as HTMLButtonElement;
      if(eventTarget.matches('button.destroy')) {
        deleteItem(eventTarget.dataset.index);
      }
    })

  return newTodoList;
}