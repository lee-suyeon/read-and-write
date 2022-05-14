import { State } from '../common'
import todosView from './todos'
import counterView from './counter'
import filtersView from './filters'

export default (targetElement: HTMLElement, state: State)  => {
  const element = targetElement.cloneNode(true) as HTMLElement;

  const list = element.querySelector('.todo-list')!
  const counter = element.querySelector('.todo-count') as HTMLElement;
  const filters = element.querySelector('.filters') as HTMLElement;

  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filtersView(filters, state));

  return element;
}