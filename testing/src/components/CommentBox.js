import React, { Component } from 'react'

class CommentBox extends Component {
  state = { comment: '' }

  handleChange = (event) => {
    this.setState({ comment: event.target.value })
  }

  handleSubmit = (event) => {
    // Prevent HTML behavior such as refreshing
    event.preventDefault()

    // TODO - Call action creator
    this.setState({ comment: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Add a comment</h4>
        <textarea 
          value={this.state.comment}
          onChange={this.handleChange}
        />
        <div>
          <button>Submit comment</button>
        </div>
      </form>
    )
  }
}

export default CommentBox