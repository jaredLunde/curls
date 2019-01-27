import {jsx} from '@emotion/core'
import objectWithoutProps from 'object-without-props'
import getCSS from './utils/getCSS'
import assignOrdered from './utils/assignOrdered'
import ThemeConsumer from './ThemeConsumer'


export function renderNode (nodeProps, defaultCSS) {
  if (defaultCSS !== void 0) {
    nodeProps.css =
      nodeProps.css === void 0 || nodeProps.css === null || nodeProps.css === false
        ? defaultCSS
        : [defaultCSS, nodeProps.css]
  }

  return renderNodeFast(nodeProps)
}

export function renderNodeFast (nodeProps) {
  const as = nodeProps.as
  delete nodeProps.as

  if (typeof as === 'string') {
    nodeProps.ref = nodeProps.innerRef
    delete nodeProps.innerRef
  }

  return jsx(as, nodeProps)
}

export default function createComponent ({
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

    const styles = CSS && getCSS(props, theme, CSS)

    if (styles !== void 0) {
      if (styles.css.length) {
        renderProps.css = [styles.css, renderProps.css]
      }

      if (styles.style !== void 0) {
        renderProps.style = (
          renderProps.style
          ? {...renderProps.style, ...styles.style}
          : styles.style
        )
      }
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
