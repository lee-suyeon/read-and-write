// Rendering a High-Order Function
import { State, Events } from './common';

interface RegistryType {
  [key: string]: Function;
}

const registry: RegistryType = {}

const renderWrapper = (component: Function): Function => {
  return (targetElement: Element, state: State, events: Events) => {
    const element = component(targetElement, state, events)
    const childComponents = element.querySelectorAll(['[data-component]'])
    // childComponents ➡️ [ul.todo-list, span.todo-count, ul.filters]

    let childArray = Array.from(childComponents) as HTMLElement[]
    childArray.forEach(target => {
        const name = target.dataset.component;
        const child = name ? registry[name] : null;
        if(!child) {
          return;
        } else {
          target.replaceWith(child(target, state, events))
        }
      })
    return element
  }
}

// To add a component to registry
const add = (name: string, component: Function): void => {
  registry[name] = renderWrapper(component)
}

// Boot Function of Component-Based Application
const renderRoot = (root: Element, state: State, events: Events): HTMLElement => {
  const cloneComponent = (root: Element): Node => {
    return root.cloneNode(true)
  }

  return renderWrapper(cloneComponent)(root, state, events)
}

export default {
  add,
  renderRoot
}