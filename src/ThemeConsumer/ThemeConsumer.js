import React from 'react'
import memoize from 'memoize-two-args'
import {CurlsContext} from '../ThemeProvider'
import getTheme from '../utils/getTheme'


let uncached = 0
const mergeGlobals_ = memoize(
  // this is memoized for defaultTheme merging efficiency and sCU in children
  function (curlsTheme, theme) {
    uncached += 1
    console.log('Uncached:', uncached)
    const base = {
      colors: curlsTheme.colors,
      typeFaces: curlsTheme.typeFaces
    }

    return theme === emptyObj ? base : Object.assign(base, theme)
  }
)


const emptyObj = {}

function mergeGlobals (curlsTheme, props) {
  if (props.path === void 0) {
    return getTheme(props.defaultTheme, curlsTheme || emptyObj)
  }
  else {
    const theme = getTheme(
      props.defaultTheme,
      mergeGlobals_(curlsTheme, curlsTheme[props.path] || emptyObj)
    )

    return theme
  }
}


export default function (props) {
  return (
    <CurlsContext.Consumer>
      {function (consumerProps) {
        consumerProps = {
          theme: mergeGlobals(consumerProps.theme, props),
          setTheme: consumerProps.setTheme,
          replaceTheme: consumerProps.replaceTheme,
        }

        return props.children(consumerProps)
      }}
    </CurlsContext.Consumer>
  )
}
