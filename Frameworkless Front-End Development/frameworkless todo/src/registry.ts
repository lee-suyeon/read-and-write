// Rendering a High-Order Function
import { State } from './common';
const registry = {}

const renderWrapper = component => {
  return (targetElement, state: State) => {
    const element = component(targetElement, state)

    const childComponents = element.querySelectorAll(['[data-component]'])

    Array
      .from(childComponents)
      .forEach(target => {
        const name = target.dataset.component
        const child = registry[name];
        if(!child) return;

        target.replaceWith(child(target.state))
      })
    return element
  }
}

// To add a component to registry
const add = (name: String, component): void => {
  registry[name] = renderWrapper(component)
}

// Boot Function of Component-Based Application
const renderRoot = (root, state: State) => {
  const cloneComponent = root => {
    return root.cloneNode(true)
  }

  return renderWrapper(cloneComponent)(root, state)
}

export default {
  add,
  renderRoot
}