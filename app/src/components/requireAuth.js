import React, { Component } from 'react'
import { connect } from 'react-redux'

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    // Functionalities that are tied to the ChildComponent
    componentDidMount() {
      this.shouldNavigateAway()
    }

    componentDidUpdate() {
      this.shouldNavigateAway()
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/')
      }
    }
    // =======================================================

    render() {
      // Need to pass the props that the ChildComponent received before passed into the HOC
      return <ChildComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return { auth: state.auth }
  }

  return connect(mapStateToProps)(ComposedComponent)
}

