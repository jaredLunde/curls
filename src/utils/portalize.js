import React from 'react'
import Portalize from 'react-portalize'
import ThemeConsumer from '../ThemeConsumer'
import ThemeProvider from '../ThemeProvider'


export default function portalize (Component, portal) {
  if (portal === false || portal === void 0 || portal === null) {
    return Component
  }

  const props = {children: Component}

  if (typeof portal === 'string') {
    props.container = portal
  }
  else {
    Object.assign(props, portal)
  }

  return (
    <ThemeConsumer>
      {theme => {
        const themeProvider = {provider: ThemeProvider, value: theme}
        props.providers = props.providers === void 0
          ? [themeProvider]
          : [themeProvider, ...props.providers]

        return React.createElement(Portalize, props)
      }}
    </ThemeConsumer>
  )
}
