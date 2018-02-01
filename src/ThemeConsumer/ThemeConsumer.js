import React from 'react'
import {string, object} from 'prop-types'
import memoize from 'memoize-two-args'
import contextTypes from '../ThemeProvider/contextTypes'
import getTheme from '../utils/getTheme'


// let uncached = 0
const mergeGlobals_ = memoize(
  // this is memoized for defaultTheme merging efficiency and sCU in children
  function (curlsTheme, theme) {
    // uncached += 1
    // console.log('Uncached:', uncached)
    const base = {
      colors: curlsTheme.colors,
      typeFaces: curlsTheme.typeFaces
    }

    return theme === emptyObj ? base : Object.assign(base, theme)
  }
)


const emptyObj = {}

function mergeGlobals (curlsTheme) {
  return function (prevState, props = emptyObj) {
    if (props.path === void 0) {
      return {theme: getTheme(props.defaultTheme, curlsTheme || emptyObj)}
    }
    else {
      const theme = getTheme(
        props.defaultTheme,
        mergeGlobals_(curlsTheme, curlsTheme[props.path] || emptyObj)
      )

      return theme === prevState.theme ? null : {theme}
    }
  }
}


export default class ThemeConsumer extends React.Component {
  static contextTypes = contextTypes
  static propTypes = {
    path: string,
    defaultTheme: object
  }

  constructor (props, context) {
    super(props)

    if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
      if (context === void 0 || context.curls === void 0) {
        throw new Error('`ThemeConsumer` must be used within a `ThemeProvider` component.')
      }
    }
  
    context.curls.subscribe(this.inheritTheme)
    this.state = mergeGlobals(context.curls.getTheme())(emptyObj, props)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.path !== this.props.path) {
      this.setState(mergeGlobals(this.context.curls.getTheme()))
    }
  }

  componentWillUnmount () {
    this.context.curls.unsubscribe(this.inheritTheme)
  }

  inheritTheme = nextTheme => {
    this.setState(mergeGlobals(nextTheme))
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
