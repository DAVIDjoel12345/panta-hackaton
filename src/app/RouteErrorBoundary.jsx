import { Component } from 'react'
import UnexpectedErrorState from '../components/states/UnexpectedErrorState.jsx'

export default class RouteErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? <UnexpectedErrorState /> : this.props.children
  }
}
