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

const mergeGlobals = ({userTheme, theme}, props) => {
  const name = props.name || props.path

  if (name === void 0)
    return theme
  else {
    if (__DEV__)
      if (props.path !== void 0)
        console.warn(`The 'path' prop in ThemeConsumer is deprecated. Use 'name' instead.`)

    const componentTheme = getTheme(
      props.defaultTheme,
      mergeGlobals_(userTheme, getTheme(props.defaultTheme, userTheme[name]))
    )

    theme[name] = getTheme(props.defaultTheme, userTheme[name])
    return componentTheme
  }
}

export default props => {
  const consumerProps = {}
  const Consumer = context => {
    consumerProps.theme = mergeGlobals(context, props)
    consumerProps.setTheme = context.setTheme
    consumerProps.replaceTheme = context.replaceTheme
    return props.children(consumerProps)
  }

  return React.createElement(CurlsContext.Consumer, emptyObj, Consumer)
}

export const useTheme = (options = emptyObj) => mergeGlobals(useContext(CurlsContext), options)