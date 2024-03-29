import React from 'react'
import { mount } from 'enzyme'

import Root from 'Root'
import CommentBox from "components/CommentBox"


let component

beforeEach(() =>  {
  component = mount(
    <Root>
      <CommentBox />
    </Root>
  )
})

afterEach(() => {
  component.unmount()
})

it('has a text area and two button', () => {
  expect(component.find('textarea').length).toEqual(1)
  expect(component.find('button').length).toEqual(2)
})

describe('the textarea', () => {
  beforeEach(() => {
    // 1. Find the textarea
    // 2. Simulate a 'change' event
    //      'change' is the event name
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