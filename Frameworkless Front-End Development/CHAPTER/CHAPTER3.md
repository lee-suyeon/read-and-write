## 3. Managing Dom Events

---

- how to manage events in a frameworkless application.

### The YAGNI Principle

- You Aren't Gonna Need It.
- _Always implement things when you actually need them. Never when you just foresee that you need them_

<br />

### The DOM Events API

- basic click event lifecycle
  > Button Rendered ➡️ Button Clicked ➡️ `click` Event Dispatched ➡️ `click` Event Captured ➡️ Reacted to `click` Event

<br />

### The DOM Event Lifecycle

```javascript
button.addEventListener("click", handler, false);
```

- the third parameter : useCapture
  - false : bubble phase( Button ➡️ Div )
  - true : capture phase( Div ➡️ Button )

**event bubbling**

```html
<body>
  <div>
    This is a container
    <button>Click Here</button>
  </div>
  <script>
    const button = document.querySelector("button");
    const div = document.querySelector("div");

    div.addEventListener(
      "click",
      () => {
        console.log("Div Clicked");
      },
      false
    );

    button.addEventListener(
      "click",
      () => {
        console.log("Button Clicked");
      },
      false
    );
  </script>
</body>
```

- result : Button Clicked ➡️ Div Clicked
- the event object stats from the DOM node that triggered it and goes up to all **its ancestors**.
- `e.stopPropagation()` : stopping the Bubble chain.

**event capture**

- The system starts managing handlers from the `<html>`
  tag and goes deeper until the element that triggered the event is managed

**DOM events' lifecycle**

1. _Capture phase_: The event travels from html to target element.
2. _Target phase_: The event reaches the target element.
3. _Bubble phase_: The event travels from target element to html.

<br />

### Using Custom Events

- `new CustomEvent(eventName, options)`
- `EventTarget.dispatchEvent()`

```html
<body>
  <input type="text" />
  <script>
    const EVENT_NAME = "FiveCharInputValue";
    const input = document.querySelector("input");

    input.addEventListener("input", () => {
      const { length } = input.value;
      console.log("input length", length);

      if (length === 5) {
        const time = new Date().getTime();
        const event = new CustomEvent(EVENT_NAME, {
          detail: {
            time,
          },
        });

        input.dispatchEvent(event);
      }
    });

    input.addEventListener(EVENT_NAME, (e) => {
      console.log("handling custom event...", e.detail);
    });
  </script>
</body>
```

<br />

### Adding Events to TodoMVC

1. Delete an item.
2. Toggle an items as complete or not.
3. Change the filter
4. Create a new item.
5. Remove all completed items.
6. Toggle all items as completed or not.
7. Edit an item.
