import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import emptyObj from 'empty/object'
import {css, ThemeContext, Global} from '@emotion/core'
import createTheme, {mergeTheme, baseTheme} from './createTheme'
import {toSize} from '../utils'
import ButtonGlobals from '../Button/global.css'
import InputGlobals from '../Input/global.css'
import LinkGlobals from '../Link/global.css'
import TextAreaGlobals from '../TextArea/global.css'
import TypeGlobals from '../Type/global.css'


export const CurlsContext = ThemeContext
const globalStyles = [TypeGlobals, ButtonGlobals, LinkGlobals, InputGlobals, TextAreaGlobals]
export const useCurls = () => useContext(CurlsContext)

export default class ThemeProvider extends React.Component {
  static propTypes = {
    userTheme: PropTypes.object
  }

  static defaultProps = {
    userTheme: emptyObj
  }

  constructor (props) {
    super(props)
    const userTheme = createTheme(props.theme)
    this.state = {
      userTheme,
      theme: Object.assign({}, userTheme),
      setTheme: this.setTheme,
      replaceTheme: this.replaceTheme
    }
  }

  componentDidUpdate ({theme}) {
    if (this.props.theme !== theme) {
      this.replaceTheme(this.props.theme)
    }
  }

  setTheme = userTheme => this.setState(
    state => {
      const userTheme = {userTheme: mergeTheme(state.userTheme, userTheme)}
      return {userTheme, theme: Object.assign(state.theme, userTheme)}
    }
  )

  replaceTheme = userTheme => {
    userTheme = createTheme(userTheme)
    this.setState({userTheme, theme: Object.assign({}, userTheme)})
  }

  render () {
    const remCSS = css`
      html {
        font-size: ${toSize(this.state.userTheme.baseRem, '%')}
      }
    `

    return (
      <CurlsContext.Provider value={this.state}>
        <Global styles={[...globalStyles, remCSS]}/>
        {this.props.children}
      </CurlsContext.Provider>
    )
  }
}
