import React from 'react'
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
    this.themeProviderContext = {
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
    this.themeProviderContext.theme = curlsTheme

    return (
      <CurlsContext.Provider value={this.themeProviderContext}>
        {this.props.children}
      </CurlsContext.Provider>
    )
  }
}
