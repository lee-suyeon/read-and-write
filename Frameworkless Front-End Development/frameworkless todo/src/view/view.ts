import todosView from './todos'
import counterView from './counter'
import filterView from './filters'

export default (targetElement: HTMLElement, state)  => {
  const element = targetElement.cloneNode(true) as HTMLElement;

  const list = element.querySelector('.todo-list') as HTMLElement;
  const counter = element.querySelector('.todo-count') as HTMLElement;
  const filters = element.querySelector('.filters') as HTMLElement;

  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filterView(filters, state));

  return element;
}