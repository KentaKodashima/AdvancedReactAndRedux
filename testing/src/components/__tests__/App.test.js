import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

it('shows a comment box', () => {
  // Create fake div inside of JSDOM in Jest
  const div = document.createElement('div')

  // Take the instance of App component and stick to 'div'
  ReactDOM.render(<App />, div)

  // Looks inside the div
  // Check to see if the CommentBox is in there
  expect(div.innerHTML).toContain('Comment Box')

  // Clear the element away when the test ends
  ReactDOM.unmountComponentAtNode(div)
})