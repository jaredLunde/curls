import React from 'react'
import memoize from 'memoize-two-args'
import {CurlsContext} from '../ThemeProvider'
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

function mergeGlobals (curlsTheme, props) {
  if (props.path === void 0) {
    return !curlsTheme ? props.defaultTheme : getTheme(props.defaultTheme, curlsTheme)
  }
  else {
    const theme = getTheme(
      props.defaultTheme,
      mergeGlobals_(curlsTheme, curlsTheme[props.path] || emptyObj)
    )

    return theme
  }
}


export default function ThemeConsumer (props) {
  const consumerProps = {}
  
  return (
    <CurlsContext.Consumer>
      {consumerContext => {
        consumerProps.theme = mergeGlobals(consumerContext.theme, props)
        consumerProps.setTheme = consumerContext.setTheme
        consumerProps.replaceTheme = consumerContext.replaceTheme
        return props.children(consumerProps)
      }}
    </CurlsContext.Consumer>
  )
}

/*
class ThemeConsumer extends React.Component {
  static displayName = 'ThemeConsumer'

  constructor (props) {
    super(props)
    this.consumerContext = {
      setTheme: props.setTheme,
      replaceTheme: props.replaceTheme,
      theme: mergeGlobals(props.theme, props)
    }
  }

  render () {
    this.consumerContext.theme = mergeGlobals(this.props.theme, this.props)
    return this.props.children(this.consumerContext)
  }
}


export default function ThemeConsumerContext (props) {
  const consumerProps = {defaultTheme: props.defaultTheme, path: props.path}

  return (
    <CurlsContext.Consumer>
      {function (consumerContext) {
        return React.createElement(
          ThemeConsumer,
          Object.assign(consumerProps, consumerContext),
          props.children
        )
      }}
    </CurlsContext.Consumer>
  )
}
*/
