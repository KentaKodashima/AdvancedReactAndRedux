import React from 'react'
import { shallow } from 'enzyme'
import App from 'components/App'
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";

let component

beforeEach(() => {
  component = shallow(<App />)
})

it('shows a comment box', () => {
  expect(component.find(CommentBox).length).toEqual(1)
})

it('shows a comment list', () => {
  expect(component.find(CommentList).length).toEqual(1)
})

// import ReactDOM from 'react-dom'
// import CommentBox from '../CommentBox';

// it('shows a comment box', () => {
//   // Create fake div inside of JSDOM in Jest
//   const div = document.createElement('div')

//   // Take the instance of App component and stick to 'div'
//   ReactDOM.render(<App />, div)

//   // Looks inside the div
//   // Check to see if the CommentBox is in there
//   // Bad practice because it counts on the contents of the component
//   // expect(div.innerHTML).toContain('Comment Box')

//   // Clear the element away when the test ends
//   ReactDOM.unmountComponentAtNode(div)
// })