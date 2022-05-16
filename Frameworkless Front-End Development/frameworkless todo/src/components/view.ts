import { Events, State } from '../common'
let template: any;

const getTemplate = () => {
  if(!template) {
    template = document.getElementById('todo-app');
  }

  return template.content.firstElementChild.cloneNode(true)
}

const addEvents = (targetElements: HTMLElement, events: Events) => {
  let newTodo = targetElements.querySelector('.new-todo') as HTMLInputElement;
  newTodo.addEventListener('keypress', event => {
    let target = event.target as HTMLInputElement;
    if(event.key === 'Enter') {
      events.addItem(target.value);
      target.value = '';
    }
  })
}

export default (targetElement: HTMLElement, state: State, events: Events): HTMLElement  => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  newApp.innerHTML = '';
  newApp.appendChild(getTemplate());
  addEvents(newApp, events)
  return newApp;
}