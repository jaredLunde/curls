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

const maybeUnshiftCssArray = (cssProp, css) => {
  if (typeof cssProp === 'object' && cssProp !== null) css.unshift(cssProp)
  return css
}

const maybeAddCssProp = (nextProps, css) => {
  if (css !== void 0) {
    // clones defaultStyles/kindCss if they are arrays to prevent runaway mutations
    const isCssArray = Array.isArray(css)

    if (Array.isArray(nextProps.css) === true) {
      // we're trying to keep our css prop a flat array for quicker interpolation in emotion
      if (isCssArray === true)
        nextProps.css.push.apply(nextProps.css, css)
      else
        nextProps.css.push(css)
    }
    else {
      // If props/nextProps match, we want to make sure we're not mutating the input props.
      // useStyles() is meant to be immutable.
      nextProps.css = maybeUnshiftCssArray(
        nextProps.css,
        isCssArray === true ? css.slice(0) : [css]
      )
    }
  }

  return nextProps
}

export default (props, options = emptyObj) => {
  if (__DEV__)
    if (options.name === void 0)
      throw new Error(
        `useStyles() must be used with a 'name' option set in order to access the proper theme`
      )

  let
    theme = useTheme(options.name, options.defaultTheme),
    {styles, defaultStyles} = options,
    kind = getKind(theme.kinds, props.kind),
    kindCss

  if (kind !== void 0 && kind.css !== void 0) {
    kindCss = kind.css
    kind = objectWithoutPropsMemo(kind, withoutCssProp)
  }

  let
    nextProps = assignOrdered(theme.defaultProps, kind, props),
    derivedStyles = typeof styles === 'object' ? getStyles(styles, theme, nextProps) : void 0,
    styleProps = kind !== void 0 ? withoutStyles(styles) : styles

  nextProps = objectWithoutProps(nextProps, styleProps)
  nextProps = maybeAddCssProp(nextProps, defaultStyles)
  nextProps = maybeAddCssProp(nextProps, kindCss)

  if (derivedStyles !== void 0) {
    // we want our CSS array to be as flat as possible since emotion interpolation will be slower
    // the more nested the array is
    if (Array.isArray(nextProps.css) === true)
      nextProps.css.push.apply(nextProps.css, derivedStyles)
    else
      nextProps.css = maybeUnshiftCssArray(nextProps.css, derivedStyles)
  }

  return nextProps
}