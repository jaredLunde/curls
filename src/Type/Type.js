import {css, cx} from 'emotion'
import {FlexBox} from '../Box'
import {createNode, getComponentTheme} from '../utils'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


/**
<Type bold xxl color='white' face='primary'>

</Type>
*/
const themePath = 'type'
const TypeSFC = createNode({
  name: 'Type',
  propTypes,
  CSS,
  defaultTheme,
  themePath,
  defaultNodeType: 'span'
})


export default function Type (props) {
  // merges the default colors and sizes to the theme
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)

  return FlexBox({
    ...props,
    children: function (sfcProps) {
      // renders the element
      sfcProps = {
        face: theme.defaultFace,
        color: theme.defaultColor,
        ...sfcProps,
        children: props.children
      }

      return TypeSFC(
        sfcProps.hasOwnProperty(theme.defaultSize)
        ? sfcProps
        : {[theme.defaultSize]: true, ...sfcProps}
      )
    }
  })
}


export function H1 (props) {
  return Type({nodeType: 'h1', xxl: true, ...props})
}

export function H2 (props) {
  return Type({nodeType: 'h2', xl: true, ...props})
}

export function H3 (props) {
  return Type({nodeType: 'h3', lg: true, ...props})
}

export function H4 (props) {
  return Type({nodeType: 'h4', md: true, ...props})
}

export function H5 (props) {
  return Type({nodeType: 'h5', sm: true, ...props})
}

export function H6 (props) {
  return Type({nodeType: 'h6', sm: true, ...props})
}

const p = css`
  word-break: break-word;
  line-height: 1.4;
`

export function P (props) {
  return Type({nodeType: 'p', m: 'b2', ...props, className: cx(p, props.className)})
}
