import { State } from '../common';

export default (targetElement: HTMLElement, { currentFilter}: State ): HTMLElement => {
  const newCounter = targetElement.cloneNode(true) as HTMLElement;
  
  let links: HTMLElement[] = Array.from(newCounter.querySelectorAll('li a'));
  links.forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected')
    } else {
      a.classList.remove('selected')
    }
  })
  return newCounter
}
