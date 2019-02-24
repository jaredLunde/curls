import React from 'react'
import memoize from 'memoize-two-args'
import {CurlsContext, baseTheme} from '../ThemeProvider'
import {getTheme} from '../utils'
import emptyObj from 'empty/object'


const mergeGlobals_ = memoize(
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
  if (props.path === void 0) {
    return theme
  }
  else {
    const componentTheme = getTheme(
      props.defaultTheme,
      mergeGlobals_(userTheme, getTheme(props.defaultTheme, userTheme[props.path]))
    )

    theme[props.path] = getTheme(props.defaultTheme, userTheme[props.path])
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
