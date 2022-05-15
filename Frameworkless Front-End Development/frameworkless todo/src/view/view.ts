let template: any;

const createAppElement = () => {
  if(!template) {
    template = document.getElementById('todo-app');
  }

  return template.content.firstElementChild.cloneNode(true)
}

export default (targetElement: HTMLElement): HTMLElement  => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  newApp.innerHTML = '';
  newApp.appendChild(createAppElement());
  return newApp;
}