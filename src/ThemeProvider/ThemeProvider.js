import React from 'react'
import Subscriptions from 'react-cake/es/Subscriptions'
import compose from 'react-cake/es/utils/compose'
import createOptimized from 'react-cake/es/utils/createOptimized'
import contextTypes from './contextTypes'
import injectTheme, {replaceTheme, curlsTheme} from '../theming/injectTheme'


class ThemeProvider extends React.Component {
  static childContextTypes = contextTypes
  static propTypes = {
    theme: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    injectTheme(props.theme)
    this.prevTheme = curlsTheme
    console.log('[🎉 injectTheme]', curlsTheme)
  }

  componentDidUpdate () {
    if (this.prevTheme !== curlsTheme) {
      this.props.notify(curlsTheme)
    }
  }

  // getTheme = () => curlsTheme
  setTheme = theme => this.props.notify(injectTheme(theme))
  replaceTheme = theme => this.props.notify(replaceTheme(theme))

  getChildContext () {
    const {subscribe, unsubscribe} = this.props
    return {
      curls: {
        theme: curlsTheme,
        setTheme: this.setTheme,
        replaceTheme: this.replaceTheme,
        subscribe,
        unsubscribe
      }
    }
  }

  render () {
    const {subscribe, unsubscribe, notify, children,...props} = this.props
    props.setTheme = this.setTheme
    props.replaceTheme = this.replaceTheme
    return createOptimized(children, props)
  }
}


export default compose([Subscriptions, ThemeProvider])
