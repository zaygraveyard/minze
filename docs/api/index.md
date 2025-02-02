# API Reference

All publicly intended API methods, properties and types are listed below.

In this reference, the term `component` usually refers to the JavaScript instance of the web component, while the term `element` refers to the DOM representation of the web component, but both mean pretty much the same thing and are sometimes used interchangeably.

## Minze

Minze class with multiple static methods and properties for common tasks.

### version

Displays the used version of Minze.

- **Property**

- **Type:** `readonly string`

- **Example:**

```js
import Minze from 'minze'

console.log(Minze.version)
```

### define

Defines a custom web component.

- **Method**

- **Type:** `(name: string, element: typeof MinzeElement): void`

- **Example:**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  // ...
}

Minze.define('my-element', MyElement)
```

```html
<my-element></my-element>
```

### defineAll

Defines all custom web components in a single call. Your components will be registered with `dash-case` naming.

::: warning
Your component class names have to be either in `PascalCase` or `camelCase` when using this registration method.
:::

- **Method**

- **Type:** `(elements: (typeof MinzeElement)[] | Record<string, typeof MinzeElement>): void`

- **Example:**

```js
import Minze, { MinzeElement } from 'minze'

class MyFirstElement extends MinzeElement {
  // ...
}

class MySecondElement extends MinzeElement {
  // ...
}

Minze.defineAll([MyFirstElement, MySecondElement])
```

<!-- prettier-ignore-start -->
```html
<my-first-element></my-first-element>
<my-second-element></my-second-element>
```
<!-- prettier-ignore-end -->

- **Modules Example:**

```js
// elements.js
import { MinzeElement } from 'minze'

export class MyFirstElement extends MinzeElement {
  // ...
}

export class MySecondElement extends MinzeElement {
  // ...
}
```

```js
import * as Elements from './elements'

Minze.defineAll(Elements)
```

<!-- prettier-ignore-start -->
```html
<my-first-element></my-first-element>
<my-second-element></my-second-element>
```
<!-- prettier-ignore-end -->

### cast

Dispatches a custom event from the `window` object. Shorthand for `Broadcasting`, not to be confused with `Type casting`.

::: tip
It's a good idea to prefix your custom event names to avoid collisions with other libraries.
:::

- **Method**

- **Type:** `(eventName: string, detail?: unknown): void`

- **Example:**

```js
import Minze from 'minze'

const optionalDetail = {
  msg: 'Hello Minze!'
}

Minze.cast('minze:my-event-name', optionalDetail)
```

### listen

Adds an event listener to the `window` object.

- **Method**

- **Type:** `(eventName: string, callback: (event: Event) => void): void`

- **Example:**

```js
import Minze from 'minze'

const callback = (event) => {
  console.log(event.detail)
}

Minze.listen('minze:my-event-name', callback)
```

### stopListen

Remove an event listener from the `window` object.

- **Method**

- **Type:** `(eventName: string, callback: (event: Event) => void): void`

- **Example:**

```js
import Minze from 'minze'

const callback = (event) => {
  // do something
}

Minze.stopListen('minze:my-event-name', callback)
```

## MinzeElement

Base class which can be used to extend from to create custom web components.

### version

Displays the used version of Minze.

- **Property**

- **Type:** `readonly string`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    console.log(this.version)
  }
}
```

### define

Defines a custom web component for the current class.

::: warning
Your component class name has to be either in `PascalCase` or `camelCase` when using this registration method.
:::

- **Static Method**

- **Type:** `(name?: string): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  // ...
}

// automatic naming based on the class name
MyElement.define()

// manual naming
MyElement.define('my-custom-element')
```

<!-- prettier-ignore-start -->
```html
<my-element></my-element>
<my-custom-element></my-custom-element>
```
<!-- prettier-ignore-end -->

### options

Individual components can be customized by declaring an options property. All currently available options are listed in the example below with their **default values**.

- **Property**

- **Type:** `Object`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  options = {
    exposeAttrs: {
      rendered: false // After the component is rendered for the first time, exposes a 'rendered' attribute on the element. E.g. <my-element rendered></my-element>
    }
  }
}
```

### reactive

Dynamically creates reactive properties on the element. A change to a reactive property will request a component re-render. `reactive` should be an array containing one or more strings or tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 3 values. The first 2 are required, the third is optional.

Tuple structure: [`name`, `value`, `exposeAttr?`]

1. **name:** has to be a `camelCase` string.
2. **value:** can be any value.
3. **exposeAttr:** (optional) not defined or `true`

::: tip
The created property is always the source of truth and not the exposed attribute. So when changing the attribute value, the property will not be updated. But changing the property value will update the attribute.
:::

::: warning
If you use the shorthand notation and provide a `camelCase` string instead of a tuple for a reactive property, the reactive property will be created with a default value of `null`.
:::

- **Property**

- **Type:** `readonly (string | [name: string, value: unknown, exposeAttr?: boolean])[]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [
    'aShorthand', // will be created as null
    ['aString', 'foo'],
    ['aBoolean', false],
    ['anArray', [1, 2, 3], true],
    ['anObject', { foo: 'bar' }]
  ]

  html = () => `
    <div>${this.aString}</div>
  `

  onReady() {
    this.aString = 'bar'

    console.log(
      this.aShorthand, // null
      this.aString, // bar
      this.aBoolean, // false
      this.anArray, // [1, 2, 3]
      this.anObject // { foo: 'bar' }
    )
  }
}
```

```html
<!-- usage -->
<my-element></my-element>

<!-- an-array attribute will be exposed automatically and look like this: -->
<my-element an-array="[1, 2, 3]"></my-element>
```

### attrs

Dynamically creates reactive properties for attributes. A change to a reactive attribute property will request a component re-render. `attrs` should be an array containing one or more strings or tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 2 values. The first 1 is required, the second is optional.

Tuple structure: [`name`, `value?`]

1. **name:** has to be a `dash-case` string.
2. **value:** (optional) not defined or any value type, which will be used to set the initial attribute, if none is found on the HTML element.

::: tip
All created attribute properties can be accessed inside the component with the `camelCase` notation. E.g. for `my-attribute` the attribute property will be `myAttribute`.
:::

::: tip
The attribute on the component is always the source of truth and not the created attribute property. So when the attribute value changes, the property will be updated. But changing the property will **not** update the attribute.
:::

::: warning
With the exception of `undefined`, `null`, `false` or `true`, all attribute properties will always be from type `string`, no matter the provided value type.
:::

::: warning
If you use the shorthand notation and provide a `dash-case` string instead of a tuple for a reactive attribute property, the reactive attribute property will be created with a default value of `null`.
:::

::: danger
For attribute property updates to be effective (on attribute changes), you have to make these attributes **observable**. It can be done by providing them to **[observedAttributes](#observedattributes)**.
:::

- **Property**

- **Type:** `readonly (string | [name: string, value?: unknown])[]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  attrs = ['text', ['bg-color', '#000']]

  onReady() {
    console.log(this.text, this.bgColor)
  }
}
```

```html
<!-- usage -->
<my-element text="Hello Minze!"></my-element>

<!-- bg-color attribute will be created on the element, since no attribute was provided and an initial value is defined -->
<my-element text="Hello Minze!" bg-color="#000"></my-element>
```

### observedAttributes

Observes the provided attribute names and updates any attribute properties defined by `attrs` accordingly. When an observed attribute changes, the `beforeAttributeChange` and `afterAttributeChange` hooks are called.

::: warning
`observedAttributes` has to be a `static` property.
:::

- **Static Property**

- **Type:** `string[]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  attrs = ['text', ['bg-color', '#000']]

  static observedAttributes = ['text', 'bg-color']

  onAttributeChange() {
    console.log(this.text, this.bgColor)
  }
}
```

### watch

Watches the given reactive properties and calls the provided callback whenever a change is detected. `wacth` should be an array containing one or more tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes exactly 2 values.

Tuple structure: [`name`, `callback`]

1. **name:** the reactive property name to watch. Has to be `camelCase`, can be optionally `dash-case` for reactive attributes declared in `attrs`.
2. **callback:** a callback function that runs whenever one of the property's values changes. Can be asynchronous.

::: warning
`watch` only works with reactive properties that where defined with `reactive` or `attrs`.
:::

- **Property**

- **Type:** `readonly [name: string, callback: (newValue?: any, oldValue?: any, key?: string, target?: object | typeof MinzeElement) => Promise<void> | void][]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  watchCount = (newValue, oldValue, key, target) => {
    console.log(newValue, oldValue, key, target) // 1, 0, count, this
  }

  watch = [['count', this.watchCount]]

  onReady() {
    this.count = 1
  }
}
```

### eventListeners

Dynamically creates event listeners, either on/inside the component or on the `window` object. `eventListeners` should be an array containing one or more tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes exactly 3 values.

Tuple structure: [`eventTarget`, `eventName`, `callback`]

1. **eventTarget:** where the event listener should be attached to. Can be a valid CSS selector (for elements inside the `html` property), `this` (The component itself) or `window`.
2. **eventName:** the name of the event to listen to.
3. **callback:** a callback function that runs when the eventName is matched.

::: warning
Web components are meant to be encapsulated HTML elements, it's a bad idea to create event listeners inside the component and attach them all over the place. That's why the targets outside of the component are intentionally limited to the `window` object, to prevent `event-listener-pollution`.
:::

::: danger
When passing a method as a callback, make sure it's either defined as an arrow function or properly bound to the component.
:::

- **Property**

- **Type:** `readonly [eventTarget: string | MinzeElement | typeof Window, eventName: string, callback: (event: Event) => void][]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <button class="button">
      Button
    </button>
  `

  handleClick = () => {
    const optionalDetail = {
      msg: 'Hello Minze!'
    }

    this.cast('minze:my-event-name', optionalDetail)
  }

  handleCast = (event) => {
    console.log(event.detail)
  }

  /*
   * Passing a callback to eventListeners
   *
   * Regular methods have to be bound to the component
   * in order to access any properties or methods of the component.
   * Properties defined with arrow functions don't need to be bound,
   * since they don't have their own 'this' binding
   * and instead are bound to the component by default.
   */
  handleNestedCast(event) {
    console.log(event.detail)
  }

  eventListeners = [
    ['.button', 'click', this.handleClick],
    [window, 'minze:my-event-name', this.handleCast],
    [this, 'minze:my-nested-event-name', this.handleNestedCast.bind(this)]
  ]
}
```

### html

Defines the elements `HTML` template.

- **Property | Method**

- **Type:** `(): string`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div>Hello Minze!</div>
  `
}
```

### css

Defines the elements scoped `CSS` template.

- **Property | Method**

- **Type:** `(): string`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  css = () => `
    :host {
      background: rgb(55 245 220);
    }
  `
}
```

### rerender

Requests a component re-render. The current template will be compared to the cached template and if they are different, the component will be rerendered. If you want to force-rerender, without any checks, pass `true` as the first argument.

- **Method**

- **Type:** `(force?: boolean): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div>Hello Minze!</div>
  `

  onReady() {
    this.rerender(true)
  }
}
```

### select

Selects the first matching element for the given `CSS` selector inside the `html` template.

- **Method**

- **Type:** `(selectors: string): Element | null`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div id="my-div"></div>
    <div></div>
  `

  onReady() {
    const element = this.select('#my-div')
    console.log(element)
  }
}
```

### selectAll

Selects all elements matching the given `CSS` selector inside the `html` template.

- **Method**

- **Type:** `(selectors: string): NodeListOf<Element> | null`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div></div>
    <div></div>
  `

  onReady() {
    const elements = this.selectAll('div')
    console.log(elements)
  }
}
```

### cast

Dispatches a custom event from the element. Shorthand for `Broadcasting`, not to be confused with `Type casting`.

::: tip
It's a good idea to prefix your custom event names to avoid collisions with other libraries.
:::

- **Method**

- **Type:** `(eventName: string, detail?: unknown): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    const optionalDetail = {
      msg: 'Hello Minze!'
    }

    this.cast('minze:ready', optionalDetail)
  }
}
```

### onStart

A Hook that runs `once` after the element is added to the DOM, but before the internal lifecycle, like creating reactive properties, or rendering the template. Can either be a regular or async method.

::: tip
This hook runs after the `beforeAttributeChange` and `afterAttributeChange` hooks if any `observed` attributes are present on the element.
:::

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onStart() {
    console.log('onStart')
  }
}
```

### onReactive

A Hook that runs `once` after the element is added to the DOM, and all reactive properties are initialized but before rendering the template. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReactive() {
    console.log('onReactive')
  }
}
```

### onReady

A Hook that runs `once` after the element is added to the DOM and the entire component lifecycle is finished. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    console.log('onReady')
  }
}
```

### onDestroy

A Hook that runs `once` after the element is disconnected from the document's DOM and all its event listeners are removed. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onDestroy() {
    console.log('onDestroy')
  }
}
```

### onMove

A Hook that runs `once` after the element is moved to a new document but before it's rendered. Can either be a regular or async method.

::: tip
If the element is moved within the same document, this hook will not be called.
:::

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onMove() {
    console.log('onMove')
  }
}
```

### beforeRender

A Hook that runs `each time` bofore a template render. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  beforeRender() {
    console.log('beforeRender')
  }
}
```

### onRender

A Hook that runs `each time` after a template render. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onRender() {
    console.log('onRender')
  }
}
```

### beforeAttributeChange

A Hook that runs `each time` before any [observed attribute](#observedattributes) changes. Can either be a regular or async method.

- **Method**

- **Type:** `(name?: string, oldValue?: string | null, newValue?: string | null): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  beforeAttributeChange(name, oldValue, newValue) {
    console.log('beforeAttributeChange: ', name, oldValue, newValue)
  }
}
```

### onAttributeChange

A Hook that runs `each time` after any [observed attribute](#observedattributes) changes. Can either be a regular or async method.

- **Method**

- **Type:** `(name?: string, oldValue?: string | null, newValue?: string | null): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onAttributeChange(name, oldValue, newValue) {
    console.log('onAttributeChange: ', name, oldValue, newValue)
  }
}
```

## Type Helpers

Some properties you can define are from the `tuple` type, but TypeScript doesn't automatically infer tuples and rather assumes that they are arrays. So you have to explicitly declare them as tuples. If you are using `reactive`, `attrs`, `watch` or `eventListeners`, you can use the following types to do so:

### Reactive

Declares `reactive` property as a mixed array of strings and tuples.

- **Type:** `readonly (string | [name: string, value: unknown, exposeAttr?: boolean])[]`

- **Alias:** `MinzeReactive`

- **Example:**

```ts
import { MinzeElement, Reactive } from 'minze'

export interface MyElement {
  foo: null
  count: number
}

export class MyElement extends MinzeElement {
  reactive: Reactive = ['foo', ['count', 0]]
}
```

### Attrs

Declares `attrs` property as a mixed array of strings and tuples.

- **Type:** `readonly (string | [name: string, value?: unknown])[]`

- **Alias:** `MinzeAttrs`

- **Example:**

```ts
import { MinzeElement, Attrs } from 'minze'

export interface MyElement {
  foo: null
  count: string
}

export class MyElement extends MinzeElement {
  attrs: Attrs = ['foo', ['count', 0]]
}
```

### Watch

Declares `watch` property as an array of tuples.

- **Type:** `readonly [name: string, callback: (newValue?: any, oldValue?: any, key?: string, target?: object | typeof MinzeElement) => Promise<void> | void][]`

- **Alias:** `MinzeWatch`

- **Example:**

```ts
import { MinzeElement, Watch } from 'minze'

export class MyElement extends MinzeElement {
  watchCount = (
    newValue: any,
    oldValue: any,
    key: string,
    target: object | typeof MinzeElement
  ) => {
    console.log(newValue, oldValue, key, target)
  }

  watch: Watch = [['count', this.watchCount]]
}
```

### EventListeners

Declares `eventListeners` property as an array of tuples.

- **Type:** `readonly [eventTarget: string | MinzeElement | typeof Window, eventName: string, callback: (event: Event) => void][]`

- **Alias:** `MinzeEventListeners`

- **Example:**

```ts
import { MinzeElement, EventListeners } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <button class="button">
      Button
    </button>
  `

  handleClick = (event: Event) => {
    console.log(event)
  }

  eventListeners: EventListeners = [['.button', 'click', this.handleClick]]
}
```
