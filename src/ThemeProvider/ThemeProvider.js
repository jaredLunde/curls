import React from 'react'
import PropTypes from 'prop-types'
import emptyObj from 'empty/object'
import {ViewportProvider} from '@render-props/viewport'
import injectTheme, {replaceTheme, baseTheme} from '../theming/injectTheme'


export const CurlsContext = React.createContext(
  {
    getTheme: null,
    setTheme: null,
    replaceTheme: null
  }
)


export default class ThemeProvider extends React.Component {
  static propTypes = {
    theme: PropTypes.object
  }

  static defaultProps = {
    theme: emptyObj
  }

  constructor (props) {
    super(props)
    this.state = {theme: injectTheme(baseTheme, props.theme)}
    this.themeProviderContext = {
      theme: this.state.theme,
      setTheme: this.setTheme,
      replaceTheme: this.replaceTheme
    }
    // console.log('[🎉 Theme]', this.state.theme)
  }

  setTheme = theme => this.setState(
    prevState => ({theme: injectTheme(prevState.theme, theme)})
  )

  replaceTheme = theme => this.setState(
    prevState => ({theme: replaceTheme(prevState.theme, theme)})
  )

  render () {
    this.themeProviderContext.theme = this.state.theme

    return (
      <ViewportProvider>
        <CurlsContext.Provider value={this.themeProviderContext}>
          {this.props.children}
        </CurlsContext.Provider>
      </ViewportProvider>
    )
  }
}
