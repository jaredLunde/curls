import React, {useContext} from 'react'
import memoize from 'trie-memoize'
import {CurlsContext, baseTheme} from '../ThemeProvider'
import {getTheme} from '../utils'
import emptyObj from 'empty/object'


const mergeGlobals_ = memoize(
  [WeakMap, WeakMap],
  // this is memoized for defaultTheme merging efficiency and sCU in children
  (curlsTheme, userTheme) => {
    let base = {}, baseKeys = Object.keys(baseTheme), i =0

    for (; i < baseKeys.length; i++)
      base[baseKeys[i]] = curlsTheme[baseKeys[i]]

    return userTheme === emptyObj ? base : Object.assign(base, userTheme)
  }
)

const mergeGlobals = (name, defaultTheme, {userTheme, theme}) => {
  if (name === void 0)
    return theme
  else {
    const
      nextTheme = getTheme(defaultTheme, userTheme[name]),
      componentTheme = getTheme(defaultTheme, mergeGlobals_(userTheme, nextTheme))
    theme[name] = nextTheme
    return componentTheme
  }
}

export default props => {
  const consumerProps = {}
  const Consumer = context => {
    consumerProps.theme = mergeGlobals(props.name, props.defaultTheme, context)
    consumerProps.setTheme = context.setTheme
    consumerProps.replaceTheme = context.replaceTheme
    return props.children(consumerProps)
  }

  return React.createElement(CurlsContext.Consumer, emptyObj, Consumer)
}

export const useTheme = (name, defaultTheme) => {
  if (typeof name === 'object') {
    name = name.name
    defaultTheme = name.defaultTheme
  }

  return mergeGlobals(name, defaultTheme, useContext(CurlsContext))
}