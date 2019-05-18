import {jsx} from '@emotion/core'
import emptyObj from 'empty/object'
import {getStyles, assignOrdered, objectWithoutProps} from './utils'
import ThemeConsumer from './ThemeConsumer'


export const renderNode = (nodeProps, defaultCSS) => {
  if (defaultCSS !== void 0)
    nodeProps.css = nodeProps.css !== void 0 ? [defaultCSS, nodeProps.css] : defaultCSS
  return renderNodeFast(nodeProps)
}

const withoutElementProps = {as: 0, innerRef: 0}

export const renderNodeFast = nodeProps => {
  nodeProps.ref = nodeProps.innerRef
  return jsx(nodeProps.as, objectWithoutProps(nodeProps, withoutElementProps))
}

const composeThemePlugins = (...funcs) => {
  let i

  return (props, themeProps) => {
    for (i = funcs.length - 1; i > -1; i--)
      props = funcs[i].call(this, props, themeProps)
    return props
  }
}

const getKind = (kinds, kind) => kinds === void 0 || kind === void 0 ? void 0 : kinds[kind]
const defaultWithout = {kind: 0, children: 0}
const withoutCssProp = {css: 0}

export default ({
  name,
  styles,
  defaultTheme,
  plugins,
  CSS,      // deprecated
  themePath // deprecated
}) => {
  if (CSS !== void 0) {
    if (__DEV__)
      console.warn(
        `[${name || themePath}] The 'CSS' property in Curls.createComponent() is deprecated. Use 'styles' instead.`
      )

    styles = CSS
  }

  if (themePath !== void 0) {
    if (__DEV__)
      console.warn(
        `[${name || themePath}] The 'themePath' property in Curls.createComponent() is deprecated. Use 'name' instead.`
      )
    name = themePath
  }

  if (name === void 0)
    throw new Error(`Curls components must be created with a 'name' option set.`)

  if (defaultTheme !== void 0)
    defaultTheme = Object.assign({}, defaultTheme)

  const withoutProps = Object.assign({}, defaultWithout, styles)
  const render = (props, themeProps) => {
    const theme = themeProps.theme
    let kind = getKind(theme.kinds, props.kind), kindCss

    if (kind !== void 0 && kind.css !== void 0) {
      kindCss = kind.css
      kind = objectWithoutProps(kind, withoutCssProp)
    }

    props =
      theme.defaultProps === void 0
        ? assignOrdered(emptyObj, kind, props)
        : assignOrdered(theme.defaultProps, kind, props)

    const
      renderProps = objectWithoutProps(props, withoutProps),
      css = typeof styles === 'object' ? getStyles(styles, theme, props) : void 0

    renderProps.css = kindCss !== void 0 ? [renderProps.css, kindCss] : renderProps.css

    if (css !== void 0) {
      if (css.css.length > 0) {
        if (Array.isArray(renderProps.css) === true) {
          renderProps.css.push(css.css)
        }
        else {
          renderProps.css =
            typeof renderProps.css === 'object'
              ? [renderProps.css, css.css]
              : css.css
        }
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

  return props => ThemeConsumer({
    name,
    defaultTheme,
    children: themeProps => renderTheme(props, themeProps)
    /*
     children: themeProps => {
     const start = typeof window !== 'undefined' && performance.now()
     const result = renderTheme(props, themeProps)
     if (start) {
     const run = performance.now() - start
     elapsed += run
     renders++
     console.log('Elapsed:', elapsed, 'Renders', renders)
     console.log('avg:', elapsed / renders)
     }
     return result
     }
     */
  })
}
// let elapsed = 0, renders = 0