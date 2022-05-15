import todos from './getTodos';
import todosView from './view/todos';
import counterView from './view/counter';
import filtersView from './view/filters';
import appView from './view/view';

import registry from './registry';
import applyDiff from './applyDiff';

import { State } from './common';

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state:State = {
  todos: [],
  currentFilter: 'All'
}

const events = {
  deleteItem: (index: number): void => {
    state.todos.splice(index, 1);
    render();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false
    })
    render();
  }
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root')!
    const newMain = registry.renderRoot(main, state, events);
    
    if(main) {
      applyDiff(document.body, main, newMain)
    }
  })
}

render();