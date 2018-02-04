import React from 'react'
import {cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
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
      : reduceProps(props, propTypes)
    )
    delete renderProps.children

    const classNames = CSS && getClassNames(props, theme, CSS)

    if (classNames !== void 0 || Array.isArray(props.className)) {
      renderProps.className = cx(classNames, props.className)
    }

    return props.children(renderProps)
  }

  function SFC (props) {
    return ThemeConsumer({
      path: themePath,
      defaultTheme,
      children: function (themeProps) { return renderer(props, themeProps) }
    })
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    SFC.displayName = name
    SFC.propTypes = propTypes
  }

  return SFC
}
