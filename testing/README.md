# Advanced React and Redux

## Jest : Testing in React
Jest is an automated test runner.

### What/How to test
The steps to find what to test.

1. Look at each indivisual part of your application
2. Imagine telling a friend 'heres what this 	piece of code does'
3. Write a test to verify each part does what you expect

### Format
```
// 1st: Description of the test func
// 2nd: Actual logic
it('shows a comment box', () => {
  // Create fake div inside of JSDOM in Jest
  const div = ducument.create('div')

  // Take the instance of App component and stick to 'div'
  ReactDOM.render(<App />, div)

  // Looks inside the div
  // Check to see if the CommentBox is in there

  // Clear the element away when the test ends
  ReactDOM.unmountComponentAtNode(div)
})
```

### Enzyme
It's a library specifically for testing in React, created by Airbnb.

#### Renderers
1. Static  
	Render the given component and return plain HTML
2. Shallow  
	Render \*Just* the given component and none of its children
3. Full DOM  
	Render the component and all of its children + let us modify it afterwards.  
  **Note:** unlike shallow or static rendering, full rendering actually mounts the component in the DOM, which means that tests can affect each other if they are all using the same DOM. Keep that in mind while writing your tests and, if necessary, use .unmount() or something similar as cleanup.
	
#### Configuration
```
import { Enzyme } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
```

### Predefinition of constants
```
let component

beforeEach(() => {
  component = shallow(<App />)
})
```

### Cleaning up
We need to clean up the components after testing especially when we use Full DOM. Otherwise, it interferes other tests.

```
afterEach(() => {
  component.unmount()
})
```

### Enzyme Methods
- `.find(selector) => ReactWrapper`  
  Can be used to find the specific component in the component
- `.simulate(event[, ...args]) => Self`  
  Simulate events on the root node in the wrapper. It must be a single-node wrapper.
- `.update() => Self`  
  Forces a re-render. Useful to run before checking the render output if something external may be updating the state of the component somewhere.  
  **NOTE:** can only be called on a wrapper instance that is also the root instance.


- `.text() => String`  
  Returns a string of the rendered text of the current render tree. This function should be looked at with skepticism if being used to test what the actual HTML output of the component will be. If that is what you would like to test, use enzyme's render function instead.  
  **Note:** can only be called on a wrapper of a single node.
- `.render() => CheerioWrapper`  
  Returns a CheerioWrapper around the rendered HTML of the single node's subtree. It must be a single-node wrapper.


### Testing in React/Redux App
Importing a component itself in a test file would be a problem if the component is wired up with Redux store. 

The error below is saying that the test file only knows about the component and has no idea about what the store is.

```
Invariant Violation: Could not find "store" in the context of "Connect(CommentBox)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(CommentBox) in connect options.
```

#### Solution to the Problem
Create Root.js which has 'Provider', 'createStore' and other redux stuff. Then you can import the Root in testing files.

Root.js
```
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from 'reducers'

export default props => {
  return (
    <Provider store={createStore(reducers, {})}>
      {props.children}
    </Provider>
  )
}
```

Component.test.js
```
let component

beforeEach(() =>  {
  component = mount(
    <Root>
      <ComponentName />
    </Root>
  )
})
```
#### Root with initialState
There are cases when initialState is needed to test the component. We solve this problem by giving initialState props to Root. 

In this case, Root has to handle empty props since the actual component doesn't need the props. We take care of this by assigning default values to props using ES destructuring syntax.

CommentList.test.js
```
beforeEach(() => {
  const initialState = {
    comments: ['Comment 1', 'Comment 2']
  }

  component = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  )
})
```

Root.js
```
// ES destructuring allows us to assign default values to props
export default ({ children, initialState = {} }) => {
  return (
    <Provider store={createStore(reducers, initialState)}>
      {children}
    </Provider>
  )
}
```