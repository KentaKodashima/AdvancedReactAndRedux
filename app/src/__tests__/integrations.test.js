import React from 'react'
import { mount } from 'enzyme'
import moxios from 'moxios'

import Root from 'Root'
import App from 'components/App'

let expectedPosts

beforeEach(() => {
  moxios.install()
  moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }]
  })
})

afterEach(() => {
  moxios.uninstall()
})

it('can fetch a list of comments and display them', async done => {
  // Attempt to render the *entire* app
  const comment = mount(
    <Root>
      <App />
    </Root>
  )

  // find the 'fetchComments' button and click it
  comment.find('.fetch-comments').simulate('click')

  // introduce a pause
  moxios.wait(async () => {
    comment.update()

    // Expect to find a list of comments
    expect(comment.find('li').length).toEqual(2)

    done()
    comment.unmount()
  })
})