## 4. Web Components

---

<br />

### The APIs

- HTML templates
  - 페이지를 불러온 순간 즉시 그려지지는 않지만, 이후 JavaScript를 사용해 인스턴스를 생성할 수 있는 HTML 코드를 담을 방법을 제공
  - [template tag - mdn](https://developer.mozilla.org/ko/docs/Web/HTML/Element/template)
- Custom elements
  - HTML 페이지에서 기능을 캡슐화하는 사용자 정의 요소를 생성
  - [Custom elements - mdn](https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_custom_elements)
- Shadow DOM
  - Shadow DOM API는 캡슐화의 핵심 파트이며, 숨겨진 분리된 DOM을 요소에 부착하는 방법을 제공
  - [shadow DOM - mdn](https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM)

<br />

### Custom Elements

- `connectedCallback`
  - lifecycle methods of a custom element
  - invoked when the component is attached to the DOM.
  - similar to the `componentDidMount` method in React.
- `disconnectedCallback`
  - invoked when the component is removed from the DOM
  - cleanup operation.
- `window.customElements.define()`
  - add new component to browser component registry.
  - `define(name, constructor)`
  ```javascript
  window.customElements.define("hello-world", HelloWorld);
  ```

### Managing Attributes

```javascript
  get color() {
    return this.getAttribute('color') || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute('color', value)
  }
```

<br />

### attributeChangedCallback

- 사용자 정의 요소의 특성 중 하나가 추가되거나, 제거되거나, 변경될 때 호출
- Not every attribute will trigger attributeChangedCallback, only the attributes listed in the observedAttributes array.

```javascript
  attributeChangedCallback(name, oldValue, newValue) {
    if(!this.div) {
      return;
    }
    if(name === 'color') {
      this.div.style.color = newValue;
    }
  }
```

<br />
