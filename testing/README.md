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