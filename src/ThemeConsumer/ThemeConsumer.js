import React from 'react'
import {string} from 'prop-types'
import contextTypes from '../ThemeProvider/contextTypes'
import memoize from '../utils/lru'


const mergeGlobals_ = memoize(1024)(
  // this is memoized for defaultTheme merging efficiency and sCU in children
  function (curlsTheme, theme) {
    const {colors, typeFaces, rem} = curlsTheme
    return {colors, typeFaces, rem, ...theme}
  }
)

function mergeGlobals (curlsTheme, componentThemePath) {
  if (componentThemePath === void 0) {
    return curlsTheme
  }
  else {
    return mergeGlobals_(curlsTheme, curlsTheme[componentThemePath])
  }
}


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
    this.state = mergeGlobals(context.curls.getTheme(), props.path)
  }

  componentDidUpdate ({path}) {
    if (path !== this.props.path) {
      this.setState(mergeGlobals(this.context.curls.getTheme(), props.path))
    }
  }

  componentWillUnmount () {
    this.context.curls.unsubscribe(this.inheritTheme)
  }

  inheritTheme = nextTheme => {
    const path = this.props.path

    if (
      path === void 0
      || nextTheme.colors !== this.state.colors
      || nextTheme.typeFaces !== this.state.typeFaces
      || nextTheme.rem !== this.state.rem
      || this.state[path] !== nextTheme[path]
    ) {
      this.setState(mergeGlobals(nextTheme, path))
    }
  }

  render () {
    const curls = this.context.curls
    return this.props.children({
      theme: this.state,
      replaceTheme: curls.replaceTheme,
      setTheme: curls.setTheme
    })
  }
}
