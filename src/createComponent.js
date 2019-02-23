import {jsx} from '@emotion/core'
import objectWithoutProps from 'object-without-props'
import {getCSS, assignOrdered} from './utils'
import ThemeConsumer from './ThemeConsumer'


const composeThemePlugins = (...funcs) => {
  let i

  return (props, themeProps) => {
    for (i = funcs.length - 1; i > -1; i--) {
      props = funcs[i].call(this, props, themeProps)
    }

    return props
  }
}

export const renderNode = (nodeProps, defaultCSS) => {
  if (defaultCSS !== void 0) {
    nodeProps.css = nodeProps.css ? [defaultCSS, nodeProps.css] : defaultCSS
  }

  return renderNodeFast(nodeProps)
}

export const renderNodeFast = nodeProps => {
  const as = nodeProps.as
  nodeProps.ref = nodeProps.innerRef
  delete nodeProps.as
  delete nodeProps.innerRef

  // if (typeof as === 'string') {
  //   nodeProps.ref = nodeProps.innerRef
  //   delete nodeProps.innerRef
  // }

  return jsx(as, nodeProps)
}

export default ({
  name,
  CSS,
  propTypes,
  defaultTheme,
  themePath,
  plugins
}) => {
  if (defaultTheme !== void 0) {
    // translates __esModule stuff to plain obj
    defaultTheme = Object.assign({}, defaultTheme)
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
          ? Object.assign({}, renderProps.style, styles.style)
          : styles.style
        )
      }
    }

    return props.children(renderProps)
  }
  const themeRenderer =
    plugins !== void 0 && plugins.length
      ? composeThemePlugins(renderer, ...plugins)
      : renderer

  function SFC (props) {
    return ThemeConsumer({
      path: themePath,
      defaultTheme,
      children: themeProps => themeRenderer(props, themeProps)
    })
  }

  if (__DEV__) {
    SFC.displayName = name
    SFC.propTypes = propTypes
  }

  return SFC
}
