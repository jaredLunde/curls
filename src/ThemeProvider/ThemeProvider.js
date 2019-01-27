import React from 'react'
import PropTypes from 'prop-types'
import emptyObj from 'empty/object'
import {ViewportProvider} from '@render-props/viewport'
import {ThemeContext} from '@emotion/core'
import injectTheme, {replaceTheme, baseTheme} from '../theming/injectTheme'


export const CurlsContext = ThemeContext

export default class ThemeProvider extends React.Component {
  static propTypes = {
    theme: PropTypes.object
  }

  static defaultProps = {
    theme: emptyObj
  }

  constructor (props) {
    super(props)
    this.state = {
      theme: injectTheme(baseTheme, props.theme),
      setTheme: this.setTheme,
      replaceTheme: this.replaceTheme
    }
  }

  componentDidUpdate ({theme}) {
    if (this.props.theme !== theme) {
      this.setState({theme: injectTheme(baseTheme, this.props.theme)})
    }
  }

  setTheme = theme => this.setState(
    prevState => ({theme: injectTheme(prevState.theme, theme)})
  )

  replaceTheme = theme => this.setState(
    prevState => ({theme: replaceTheme(prevState.theme, theme)})
  )

  render () {
    return (
      <ViewportProvider>
        <CurlsContext.Provider value={this.state}>
          {this.props.children}
        </CurlsContext.Provider>
      </ViewportProvider>
    )
  }
}
