import React from 'react'
import {string} from 'prop-types'
import contextTypes from '../ThemeProvider/contextTypes'
import memoize from '../utils/memoize'

// let uncached = 0
const mergeGlobals_ = memoize(WeakMap)(
  // this is memoized for defaultTheme merging efficiency and sCU in children
  function (curlsTheme, theme) {
    // uncached += 1
    // console.log('Uncached:', uncached)
    return Object.assign(
      {
        colors: curlsTheme.colors,
        typeFaces: curlsTheme.typeFaces
      },
      theme
    )
  }
)

function mergeGlobals (curlsTheme, componentThemePath) {
  return function (prevState) {
    if (componentThemePath === void 0) {
      return curlsTheme
    }
    else {
      if (curlsTheme[componentThemePath] === void 0) {
        return {
          colors: curlsTheme.colors,
          typeFaces: curlsTheme.typeFaces
        }
      }

      const theme = mergeGlobals_(curlsTheme, curlsTheme[componentThemePath])

      if (theme === prevState.theme) {
        return null
      }
      else {
        return {theme}
      }
    }
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
    this.state = mergeGlobals(context.curls.getTheme(), props.path)({})
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

    this.setState(mergeGlobals(nextTheme, path))
  }

  render () {
    const curls = this.context.curls
    return this.props.children({
      theme: this.state.theme,
      replaceTheme: curls.replaceTheme,
      setTheme: curls.setTheme
    })
  }
}
