import {jsx} from '@emotion/core'
import {getStyles, assignOrdered, objectWithoutProps} from './utils'
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
  return jsx(as, nodeProps)
}

const getKind = (kinds, kind) => kinds === void 0 || kind === void 0 ? void 0 : kinds[kind]
const defaultWithout = {kind: true, children: true}

export default ({
  name,
  styles,
  defaultTheme,
  plugins,
  CSS,      //deprecated
  themePath //deprecated
}) => {
  if (CSS !== void 0) {
    if (__DEV__) {
      console.warn(
        `[${name || themePath}] The 'CSS' property in Curls.createComponent() is deprecated. Use 'styles' instead.`
      )
    }

    styles = CSS
  }

  if (themePath !== void 0) {
    if (__DEV__) {
      console.warn(
        `[${name || themePath}] The 'themePath' property in Curls.createComponent() is deprecated. Use 'name' instead.`
      )
    }

    name = themePath
  }

  if (name === void 0) {
    throw new Error(`Curls components must be created with a 'name' option set.`)
  }

  if (defaultTheme !== void 0) {
    defaultTheme = Object.assign({}, defaultTheme)
  }

  const withoutProps = Object.assign({}, defaultWithout, styles)

  function render (props, themeProps) {
    const theme = themeProps.theme
    props =
      theme.defaultProps === void 0
        ? props
        : assignOrdered(theme.defaultProps, getKind(theme.kinds, props.kind), props)
    const renderProps = objectWithoutProps(props, withoutProps)
    const css = typeof styles === 'object' ? getStyles(styles, theme, props) : void 0

    if (css !== void 0) {
      if (css.css.length > 0) {
        renderProps.css =
          typeof renderProps.css === 'object' ? [css.css, renderProps.css] : css.css
      }

      if (css.style !== void 0) {
        renderProps.style =
          typeof renderProps.style === 'object'
            ? Object.assign({}, renderProps.style, css.style)
            : css.style
      }
    }

    return props.children(renderProps)
  }

  const renderTheme =
    plugins !== void 0 && plugins.length > 0
      ? composeThemePlugins(render, ...plugins)
      : render

  return function SFC (props) {
    return ThemeConsumer({
      name,
      defaultTheme,
      children: themeProps => renderTheme(props, themeProps)
    })
  }
}
