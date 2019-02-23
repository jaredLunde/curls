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
    userTheme: PropTypes.object
  }

  static defaultProps = {
    userTheme: emptyObj
  }

  constructor (props) {
    super(props)
    const userTheme = injectTheme(baseTheme, props.theme)
    this.state = {
      userTheme,
      theme: Object.assign({}, userTheme),
      setTheme: this.setTheme,
      replaceTheme: this.replaceTheme
    }
  }

  componentDidUpdate ({theme}) {
    if (this.props.theme !== theme) {
      const userTheme = injectTheme(baseTheme, this.props.theme)
      this.setState(state => ({userTheme, theme: Object.assign(state.theme, userTheme) }))
    }
  }

  setTheme = userTheme => this.setState(
    state => {
      const userTheme = {userTheme: injectTheme(state.userTheme, userTheme)}
      return {userTheme, theme: Object.assign(state.theme, userTheme)}
    }
  )

  replaceTheme = userTheme => this.setState(
    state => {
      const userTheme = replaceTheme(state.userTheme, userTheme)
      return {userTheme, theme: Object.assign({}, userTheme)}
    }
  )

  render () {
    const remCSS = css`
      html {
        font-size: ${toSize(this.state.userTheme.baseRem, 'px')}
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
