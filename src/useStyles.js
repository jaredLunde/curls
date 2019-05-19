import emptyObj from 'empty/object'
import memoize from 'trie-memoize'
import {useTheme} from './ThemeConsumer'
import {assignOrdered, getStyles, objectWithoutProps, objectWithoutPropsMemo} from './utils'


const
  getKind = (kinds, kind) => kinds === void 0 || kind === void 0 ? void 0 : kinds[kind],
  defaultWithout = {kind: 0},
  withoutCssProp = {css: 0},
  withoutStyles = memoize([Map], styles => Object.assign({}, defaultWithout, styles))

export default (props, options = emptyObj) => {
  if (__DEV__)
    if (options.name === void 0)
      throw new Error(`useStyles() must be used with a 'name' option set`)

  let
    theme = useTheme(options),
    styles = options.styles,
    kind = getKind(theme.kinds, props.kind), kindCss

  if (kind !== void 0 && kind.css !== void 0) {
    kindCss = kind.css
    kind = objectWithoutPropsMemo(kind, withoutCssProp)
  }

  props =
    theme.defaultProps === void 0
      ? assignOrdered(emptyObj, kind, props)
      : assignOrdered(theme.defaultProps, kind, props)

  const
    renderProps = objectWithoutProps(props, withoutStyles(styles)),
    css = typeof styles === 'object' ? getStyles(styles, theme, props) : void 0

  renderProps.css = kindCss !== void 0 ? [renderProps.css, kindCss] : renderProps.css

  if (css !== void 0) {
    if (css.css.length > 0) {
      if (Array.isArray(renderProps.css) === true)
        renderProps.css.push(css.css)
      else
        renderProps.css =
          typeof renderProps.css === 'object' ? [renderProps.css, css.css] : css.css
    }

    if (css.style !== void 0)
      renderProps.style =
        typeof renderProps.style === 'object'
          ? Object.assign({}, renderProps.style, css.style)
          : css.style
  }

  return renderProps
}