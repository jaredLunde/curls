import emptyObj from 'empty/object'
import memoize from 'trie-memoize'
import {useTheme} from './ThemeConsumer'
import {getStyles, objectWithoutProps, objectWithoutPropsMemo} from './utils'


const
  getKind = (kinds, kind) => kinds === void 0 || kind === void 0 ? void 0 : kinds[kind],
  withoutCssProp = {css: 0},
  withoutStyles = memoize([Map], styles => Object.assign({kind: 0}, styles))

const assignOrdered = (defaultProps, kinds, props) => {
  let i = 0, output

  if (typeof defaultProps === 'object' && defaultProps !== null) {
    output = {}
    const keys = Object.keys(defaultProps)

    for (; i < keys.length; i++) {
      const key = keys[i]
      if (props[key] === void 0 && (kinds === void 0 || kinds[key] === void 0))
        output[key] = defaultProps[key]
    }
  }

  if (kinds !== void 0) {
    output = output || {}
    const keys = Object.keys(kinds)

    for (i = 0; i < keys.length; i++)
      if (props[keys[i]] === void 0)
        output[keys[i]] = kinds[keys[i]]
  }

  return output === void 0 ? props : Object.assign(output, props)
}

export default (props, options = emptyObj) => {
  if (__DEV__)
    if (options.name === void 0)
      throw new Error(
        `useStyles() must be used with a 'name' option set in order to access the proper theme`
      )

  let
    theme = useTheme(options),
    styles = options.styles,
    kind = getKind(theme.kinds, props.kind),
    kindCss

  if (kind !== void 0 && kind.css !== void 0) {
    kindCss = kind.css
    kind = objectWithoutPropsMemo(kind, withoutCssProp)
  }

  props = assignOrdered(theme.defaultProps, kind, props)

  let
    derivedStyles = typeof styles === 'object' ? getStyles(styles, theme, props) : void 0,
    nextProps = objectWithoutProps(props, withoutStyles(styles))

  if (kindCss !== void 0) {
    if (derivedStyles === void 0)
      derivedStyles = [kindCss]
    else
      derivedStyles.unshift(kindCss)
  }

  if (derivedStyles !== void 0 && derivedStyles.length > 0) {
    if (Array.isArray(nextProps.css) === true)
      nextProps.css.push(derivedStyles)
    else
      nextProps.css =
        typeof nextProps.css === 'object'
          ? [nextProps.css, derivedStyles]
          : derivedStyles
  }

  return nextProps
}