import React from 'react'
// import createOptimized from 'react-cake/es/utils/createOptimized'
import contextTypes from './contextTypes'
import injectTheme, {replaceTheme, curlsTheme} from '../theming/injectTheme'


export const CurlsContext = React.createContext({
  getTheme: null,
  setTheme: null,
  replaceTheme: null
})


export default class ThemeProvider extends React.Component {
  static propTypes = {
    theme: PropTypes.object
  }

  constructor (props) {
    super(props)
    injectTheme(props.theme)
    console.log('[🎉 injectTheme]', curlsTheme)
  }

  getContext () {
    return {
      theme: curlsTheme,
      setTheme: this.setTheme,
      replaceTheme: this.replaceTheme
    }
  }

  setTheme = theme => {
    injectTheme(theme)
    this.forceUpdate()
  }

  replaceTheme = theme => {
    replaceTheme(theme)
    this.forceUpdate()
  }

  render () {
    const context = this.getContext()

    return (
      <CurlsContext.Provider value={context}>
        {React.createElement(this.props.children, context)}
      </CurlsContext.Provider>
    )
  }
}
