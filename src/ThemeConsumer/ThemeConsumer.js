import React from 'react'
import memoize from 'trie-memoize'
import {CurlsContext, baseTheme} from '../ThemeProvider'
import {getTheme} from '../utils'
import emptyObj from 'empty/object'


const mergeGlobals_ = memoize(
  [WeakMap, WeakMap],
  // this is memoized for defaultTheme merging efficiency and sCU in children
  (curlsTheme, userTheme) => {
    const base = {}, baseKeys = Object.keys(baseTheme)

    for (let i = 0; i < baseKeys.length; i++) {
      const key = baseKeys[i]
      base[key] = curlsTheme[key]
    }

    return userTheme === emptyObj ? base : Object.assign(base, userTheme)
  }
)

const mergeGlobals = ({userTheme, theme}, props) => {
  const name = props.name || props.path

  if (name === void 0) {
    return theme
  }
  else {
    if (__DEV__) {
      if (props.path !== void 0) {
        console.warn(`The 'path' prop in ThemeConsumer is deprecated. Use 'name' instead.`)
      }
    }

    const componentTheme = getTheme(
      props.defaultTheme,
      mergeGlobals_(userTheme, getTheme(props.defaultTheme, userTheme[name]))
    )

    theme[name] = getTheme(props.defaultTheme, userTheme[name])
    return componentTheme
  }
}

export default function ThemeConsumer (props) {
  const consumerProps = {}

  function Consumer (consumerContext) {
    consumerProps.theme = mergeGlobals(consumerContext, props)
    consumerProps.setTheme = consumerContext.setTheme
    consumerProps.replaceTheme = consumerContext.replaceTheme
    return props.children(consumerProps)
  }

  return <CurlsContext.Consumer children={Consumer}/>
}
