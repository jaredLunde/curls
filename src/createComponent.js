import React from 'react'
import {cx} from 'emotion'
import objectWithoutProps from 'object-without-props'
import getClassNames from './utils/getClassNames'
import assignOrdered from './utils/assignOrdered'
import ThemeConsumer from './ThemeConsumer'


export function renderNode (nodeProps, defaultCSS) {
  // if (typeof nodeProps.children === 'function') {
  //   nodeProps.children = nodeProps.children({...nodeProps})
  // }

  if (defaultCSS !== void 0) {
    nodeProps.className = cx(defaultCSS, nodeProps.className)
  }

  return renderNodeFast(nodeProps)
}


export function renderNodeFast (nodeProps) {
  const nodeType = nodeProps.nodeType
  delete nodeProps.nodeType

  if (typeof nodeType === 'string') {
    nodeProps.ref = nodeProps.innerRef
    delete nodeProps.innerRef
  }

  return React.createElement(nodeType, nodeProps)
}


export default function ({
  name,
  CSS,
  propTypes,
  defaultTheme,
  themePath
}) {
  if (defaultTheme !== void 0) {
    // translates __esModule stuff to plain obj
    defaultTheme = {...defaultTheme}
  }

  if (themePath === void 0) {
    throw new Error(`[${name}] Curls components must be initialized with a 'themePath' option set.`)
  }

  function renderer (props, themeProps) {
    const theme = themeProps.theme
    const defaults = theme.defaultProps
    props = defaults === void 0 ? props : assignOrdered(defaults, props)
    const renderProps = (
      propTypes === void 0
      ? Object.assign({}, props)
      : objectWithoutProps(props, propTypes)
    )
    delete renderProps.children

    const styles = CSS && getClassNames(props, theme, CSS)

    if (styles !== void 0) {
      if (styles.classNames.length) {
        renderProps.className = cx(styles.classNames, renderProps.className)
      }

      if (styles.style !== void 0) {
        renderProps.style = (
          renderProps.style
          ? {...renderProps.style, ...styles.style}
          : styles.style
        )
      }
    }

    if (Array.isArray(renderProps.className)) {
      renderProps.className = cx(renderProps.className)
    }

    return props.children(renderProps)
  }

  function SFC (props) {
    return ThemeConsumer({
      path: themePath,
      defaultTheme,
      children: themeProps => renderer(props, themeProps)
    })
  }

  if (__DEV__) {
    SFC.displayName = name
    SFC.propTypes = propTypes
  }

  return SFC
}
