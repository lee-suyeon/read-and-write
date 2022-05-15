import { Todo, State } from '../common'

let template: any;

const createNewTodoNode = () => {
  if(!template) {
    template = document.getElementById('todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
}

// View function to Render the List
export const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;

const element = createNewTodoNode();
element.querySelector('input.edit').value = text;
element.querySelector('label').textContent = text;

if(completed) {
  element.classList.add('completed')
  element.querySelector('input.toggle').checked = true;
}

return element;
    // <template id="todo-item">
    //   <li>
    //     <div class="view">
    //       <input 
    //         ${completed ? 'checked' : ''}
    //         class="toggle" 
    //         type="checkbox">
    //       <label>${text}</label>
    //       <button class="destroy"></button>
    //     </div>
    //     <input class="edit" value="${text}">
    //   </li>
    // </template>
    
}

export default (targetElement: Node, { todos }: State) => {
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;

  newTodoList.innerHTML = '';
  todos.map(getTodoElement).forEach(element => {
    newTodoList.appendChild(element)
  })

  return newTodoList;
}