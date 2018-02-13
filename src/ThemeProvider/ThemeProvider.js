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
    console.log('[🎉 injectTheme]', curlsTheme)
    this.state = {theme: injectTheme(curlsTheme, props.theme)}
    this.themeProviderContext = {
      theme: this.state.theme,
      setTheme: this.setTheme,
      replaceTheme: this.replaceTheme
    }
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
      <CurlsContext.Provider value={this.themeProviderContext}>
        {this.props.children}
      </CurlsContext.Provider>
    )
  }
}
