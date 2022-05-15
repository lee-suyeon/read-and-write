import todos from './getTodos';
import todosView from './view/todos';
import counterView from './view/counter';
import filtersView from './view/filters';

import registry from './registry';
import applyDiff from './applyDiff';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
  todos: todos,
  currentFilter: 'All'
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp')!
    const newMain = registry.renderRoot(main, state);
    if(main) {
      applyDiff(document.body, main, newMain)
    }
  })
}

window.setInterval(() => {
  state.todos = todos;
  render();
}, 5000)

render();