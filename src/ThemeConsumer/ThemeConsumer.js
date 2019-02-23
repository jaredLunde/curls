import React from 'react'
import memoize from 'memoize-two-args'
import {baseTheme} from '../theming'
import {CurlsContext} from '../ThemeProvider'
import getTheme from '../utils/getTheme'
import emptyObj from 'empty/object'


const mergeGlobals_ = memoize(
  // this is memoized for defaultTheme merging efficiency and sCU in children
  (curlsTheme, path) => {
    const theme = curlsTheme[path]
    const base = {}

    for (let key in baseTheme) {
      base[key] = curlsTheme[key]
    }

    return theme === emptyObj ? base : Object.assign(base, curlsTheme.locals, theme)
  },
  Map
)

const mergeGlobals = (curlsTheme, props) => {
  if (props.path === void 0) {
    return !curlsTheme ? props.defaultTheme : getTheme(props.defaultTheme, curlsTheme)
  }
  else {
    return getTheme(props.defaultTheme, mergeGlobals_(curlsTheme, props.path))
  }
}

export default function ThemeConsumer (props) {
  const consumerProps = {}

  function Consumer (consumerContext) {
    consumerProps.theme = mergeGlobals(consumerContext.theme, props)
    consumerProps.setTheme = consumerContext.setTheme
    consumerProps.replaceTheme = consumerContext.replaceTheme
    return props.children(consumerProps)
  }

  return <CurlsContext.Consumer children={Consumer}/>
}
