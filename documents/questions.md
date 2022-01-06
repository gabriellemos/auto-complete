# Quiz

## What is the difference between Component and PureComponent? give an example where it might break my app.

PureComponents are deterministic where for the same attributes (props and state) you will always have a specific output. With that in mind, PureComponent are optimized so component won't re-render needlessly.

The following code, when rendering `<Parent />`, the PureComponent `<MemoChildren name="Mary" />` will be rendered only once, while `<Children name="John" />` will be rendered the same amount as Parent.

```javascript
import React, { useState, useEffect, memo } from 'react'

const Parent = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log('Parent Update')
  })

  useEffect(() => {
    setCounter(counter + 1)
  }, [])

  return (
    <div>
      <p>Parent: {counter}</p>
      <Children name="John" />
      <MemoChildren name="Mary" />
    </div>
  )
}

const Children = (props) => {
  useEffect(() => {
    console.log('Children Update', props.name)
  })

  return <p>Children - {props.name}</p>
}

const MemoChildren = memo(Children)

export default Parent
```

In the example above

[↩ Back to top](#quiz) <br/>

---

## Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

[↩ Back to top](#quiz) <br/>

---

## Describe 3 ways to pass information from a component to its PARENT.

Passing via callback function, context or some state library like Redux.

```javascript
import React, { useState, useEffect } from 'react'

const Parent = () => {
  const [value, setValue] = useState('')
  return (
    <div>
      <p>Parent: {value}</p>
      <Children setValue={setValue} />
    </div>
  )
}

const Children = (setValue) => {
  useEffect(() => {
    setValue('John')
  }, [])
  return <p>Children</p>
}
```

```javascript
import React, { useState, useEffect, createContext, useContext } from 'react'

const ParentContext = useContext()

const Parent = () => {
  const [value, setValue] = useState('')
  return (
    <ParentContext.Provider state={{ setValue }}>
      <div>
        <p>Parent {value}</p>
        <Children />
      </div>
    </ParentContext.Provider>
  )
}

const Children = () => {
  const { setValue } = useContext(ParentContext)

  useEffect(() => {
    setValue('John')
  }, [])
  return <p>Children</p>
}
```

```javascript
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Parent = () => {
  // Store is being provided somewhere else.
  const value = useSelector((state) => state.name)

  return (
    <div>
      <p>Parent: {value}</p>
      <Children />
    </div>
  )
}

const Children = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'update', payload: { name: 'John' } })
  }, [])
  return <p>Children</p>
}
```

[↩ Back to top](#quiz) <br/>

---

## Give 2 ways to prevent components from re-rendering.

It is possible to avoid re-rendering by implementing a PureComponent. On a functional component you wrap your component is with `memo`, with Class component should extend `React.PureComponent`. Doing so, the component is only re-rendered if the props or the internal state is update.

```javascript
import React, { memo } from 'react'

const MyComponent = () => {
  return <h1>Hello World!</h1>
}

export default memo(MyComponent)
```

On a Class component, you can implemente the `shouldComponentUpdate()` which returns a boolean, where `true` re-renders the component.

```javascript
import React from 'react'

class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return false
  }

  render() {
    return <h1>Hello World!</h1>
  }
}
```

[↩ Back to top](#quiz) <br/>

---

## What is a fragment and why do we need it? Give an example where it might break my app.

Since Components can't return multiple elements, instead of wrapping those elements on a extra DOM node (div for example), using `Fragment` we can group multiple sibling without producing multiple elements in the DOM.

[↩ Back to top](#quiz) <br/>

---

## Give 3 examples of the HOC pattern.

Higher-Order Components is a function that takes a component and returns a new component. With this pattern you can reuse the some logic on multiple components.

A couple of HOC mostly used on Class Components are, `withRouter` from `react-router-dom` and `connect` from `react-redux`. Another example of a HOC could be the following where it handles the rendering of a Loading component based on Context.

```javascript
import React from 'react'

const withLoader = (Component) => {
  return (props) => {
    const { isLoading } = useContext(LoaderContext)

    return (
      <React.Fragment>
        <Component {...props} />
        <ApplicationLoader loading={isLoading} />
      </React.Fragment>
    )
  }
}

export default withLoader
```

[↩ Back to top](#quiz) <br/>

---

## what's the difference in handling exceptions in promises, callbacks and async...await.

Handling in callbacks allow the flow of the thread to continue running while async...await will lock the thread until the promise is completed (successfull or rejected).

[↩ Back to top](#quiz) <br/>

---

## How many arguments does setState take and why is it async.

`setState` has two arguments, _updater_ and a _callback_ function (optional). This method is async since rendering can be an expensive operation and making it async it is possible to group mutiple state changes in a single rerendering.

[↩ Back to top](#quiz) <br/>

---

## List the steps needed to migrate a Class to Function Component.

It would be recommended that the class being converted should be covered by some tests (unity, integration or e2e) to minimize the chances of creating bugs during the conversion processs.

When converting a Class to Functional Component, normaly I'll first update the Component name and create a functional component.

```javascript
class MyComponent_OLD extends React.Component {}

const MyComponent = () => {
  return <p>MyComponent</p>
}
```

Once the functional component is created, I'll extract the content from the `render` method and will convert all methods to functions with the exception of lifecycle methods like `componentDidMount` and `componentWillUnmount`.

```javascript
class MyComponent_OLD extends React.Component {
  handleClearForm(e) {}
  handleSubmitForm(e) {}

  render() {
    return <div>...</div>
  }
}

const MyComponent = () => {
  const handleClearForm = (e) => {}
  const handleSubmitForm = (e) => {}

  return <div>...</div>
}
```

Then we will configure the component `state` set on the constructor.

```javascript
import React, { useState } from 'react'

class MyComponent_OLD extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      email: props.email
    }
  }
}

const MyComponent = (props) => {
  const [name, setName] = useState(props.name)
  const [email, setEmail] = useState(props.email)
}
```

> Normally, the constructor will be binding methods to `this`. It isn't necessary to do on a Functional Component so we may remove it.

In order to remove the `this.setState` we will use the set method we received when using `useState` hook.

```diff
-import React, { useState } from 'react'
+import React, { useState, useEffect } from 'react'

const MyComponent = (props) => {
  const [name, setName] = useState(props.name)
  const [email, setEmail] = useState(props.email)

  const handleClearForm = (e) => {
-    this.setState({ name: '', email: '' }, () => { /* trigger validation */})
+    setEmail('')
+    setName('')
  }

+  useEffect(() => {
+    // trigger validation
+  }, [name, email])
}
```

Now we will remove other references to `this` on the functional component.

```diff
const MyComponent = () => {
  return (
    <div>
-      <p>{this.state.name}</p>
-      <p>{this.state.email}</p>
+      <p>{name}</p>
+      <p>{email}</p>
       {/* ... */}
-      <button onClick={this.handleClearForm}>Clear</button>
-      <button onClick={this.handleSubmitForm}>Submit</button>
+      <button onClick={handleClearForm}>Clear</button>
+      <button onClick={handleSubmitForm}>Submit</button>
    </div>
  )
}
```

For lifecycle methods like `ComponentDidMount`, `ComponentWillUnmount` and `ComponentDidUpdate` we'll use the `useEffect` hook.

```javascript
import React, { useState, useEffect } from 'react'

const MyComponent = (props) => {
  useEffect(() => {
    console.log('component mounted')
    // return a function to execute at unmount
    return () => {
      console.log('component will unmount')
    }
  }, []) // notice the empty array

  useEffect(() => {
    console.log('component updated!')
  }) // no second argument
}
```

[↩ Back to top](#quiz) <br/>

---

## List a few ways styles can be used with components.

Inline styling where you're setting the `style` attribute of the HTML tag.

```html
<div style={{ backgroundColor: "#44014C", width: "300px", minHeight: "200px"}}/>
```

Using `styled-components` where we can write actual CSS in our JavaScript file.

```javascript
import styled from 'styled-components'

export const Container = styled.div`
  backgroundColor: "#44014C", 
  width: "300px", 
  minHeight: "200px"
`
```

Using `CSS Modules` where all classes and animation are defined on a css file.

```css
.container {
  backgroundcolor: '#44014C';
  width: '300px';
  minheight: '200px';
}
```

```javascript
import React from 'react'

const MyComponent = () => {
  return <div className="container">Hello World!</div>
}

export default MyComponent
```

[↩ Back to top](#quiz) <br/>

---

## How to render an HTML string coming from the server.

As implemented on [Autocomplete Componente](../src/components/Autocomplete/index.js#L69). In order to render HTML strings it is necessary to use the property `dangerouslySetInnerHTML` that will receive an object with the attribute `__html` where you will set your HTML string.

[↩ Back to top](#quiz) <br/>

---
