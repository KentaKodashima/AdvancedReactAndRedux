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
- find()  
  Can be used to find the specific component in the component
- simulate()
- update()
- describe()  
