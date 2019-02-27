import React from 'react'
import { mount, unmount } from 'enzyme'

import CommentBox from "components/CommentBox";
import { comment } from 'postcss-selector-parser';

let component

beforeEach(() =>  {
  component = mount(<CommentBox />)
})

afterEach(() => {
  component.unmount()
})

it('has a text area and a button', () => {
  expect(component.find('textarea').length).toEqual(1)
  expect(component.find('button').length).toEqual(1)
})

describe('the textarea', () => {
  beforeEach(() => {
    // 1. Find the textarea
    // 2. Simulate a 'change' event
      // 'change' is the event name
    // 3. Provide a fake event object
    component.find('textarea').simulate('change', {
      target: { value: 'new comment' }
    })

    // 4. Force the component to update
    component.update()
  })

  it('has a textarea that users can type in', () => {
    // 5. Assert that the textareas value has changed
    expect(component.find('textarea').prop('value')).toEqual('new comment')
  })

  it('when the form is submitted, textarea gets emptied', () => {
    component.find('form').simulate('submit')
    component.update()

    expect(component.find('textarea').prop('value')).toEqual('')
  })

})