import React from 'react'
import Subscriptions from 'react-cake/es/Subscriptions'
import compose from 'react-cake/es/utils/compose'
import reduceProps from 'react-cake/es/utils/reduceProps'
// import createOptimized from 'react-cake/es/utils/createOptimized'
import contextTypes from './contextTypes'
import injectTheme, {replaceTheme, curlsTheme} from '../theming/injectTheme'


class ThemeProvider extends React.Component {
  static childContextTypes = contextTypes
  static propTypes = {
    theme: PropTypes.object
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

  getTheme = () => curlsTheme
  setTheme = theme => this.props.notify(injectTheme(theme))
  replaceTheme = theme => this.props.notify(replaceTheme(theme))

  getChildContext () {
    return {
      curls: {
        getTheme: this.getTheme,
        setTheme: this.setTheme,
        replaceTheme: this.replaceTheme,
        subscribe: this.props.subscribe,
        unsubscribe: this.props.unsubscribe
      }
    }
  }

  render () {
    const props = reduceProps(this.props, ['subscribe', 'unsubscribe', 'notify', 'children'])
    props.setTheme = this.setTheme
    props.replaceTheme = this.replaceTheme
    props.getTheme = this.getTheme
    return React.createElement(this.props.children, props)
  }
}


export default compose([Subscriptions, ThemeProvider])
