import React from 'react'
import contextTypes from '../ThemeProvider/contextTypes'
import {string} from 'prop-types'


export default class ThemeConsumer extends React.Component {
  static contextTypes = contextTypes
  static propTypes = {
    path: string
  }

  constructor (props, context) {
    super(props)

    if (context === void 0 || context.curls === void 0) {
      throw new Error('`ThemeConsumer` must be used within a `ThemeProvider` component.')
    }

    context.curls.subscribe(this.inheritTheme)
    this.prevTheme = context.curls.theme
  }

  componentWillUnmount () {
    this.context.curls.unsubscribe(this.inheritTheme)
  }

  inheritTheme = nextTheme => {
    const path = this.props.path

    if (
      path === void 0
      || nextTheme.colors !== this.prevTheme.colors
      || nextTheme.typeFaces !== this.prevTheme.typeFaces
      || nextTheme.rem !== this.prevTheme.rem
    ) {
      this.forceUpdate()
    }
    else if (this.prevTheme[path] !== nextTheme[path]) {
      this.forceUpdate()
    }

    this.prevTheme = nextTheme
  }

  render () {
    const curls = this.context.curls
    const path = this.props.path
    const theme = path === void 0 ? curls.theme : curls.theme[path]
    return this.props.children({
      theme,
      replaceTheme: curls.replaceTheme,
      setTheme: curls.setTheme
    })
  }
}
