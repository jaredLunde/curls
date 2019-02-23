import React from 'react'
import PropTypes from 'prop-types'
import emptyObj from 'empty/object'
import {ViewportProvider} from '@render-props/viewport'
import {css, ThemeContext, Global} from '@emotion/core'
import {toSize} from '../utils'
import injectTheme, {replaceTheme, baseTheme} from '../theming/injectTheme'
import ButtonGlobals from '../Button/global.css'
import InputGlobals from '../Input/global.css'
import LinkGlobals from '../Link/global.css'
import TextAreaGlobals from '../TextArea/global.css'
import TypeGlobals from '../Type/global.css'


export const CurlsContext = ThemeContext
const globalStyles = [TypeGlobals, ButtonGlobals, LinkGlobals, InputGlobals, TextAreaGlobals]

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
    const remCSS = css`
      html {
        font-size: ${toSize(this.state.theme.baseRem, 'px')}
      }
    `
    return (
      <ViewportProvider>
        <CurlsContext.Provider value={this.state}>
          <Global styles={[...globalStyles, remCSS]}/>
          {this.props.children}
        </CurlsContext.Provider>
      </ViewportProvider>
    )
  }
}
