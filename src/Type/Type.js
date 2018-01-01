import {css, cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import {FlexBox} from '../Box'
import {createSFCNode, mergeThemeDefaults} from '../utils'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {fontColor} from './utils'


const themePath = 'type'
const TypeSFC = createSFCNode({
  name: 'Type',
  propTypes,
  CSS,
  defaultTheme,
  themePath,
  defaultNodeType: 'span'
})


export default function Type ({children, ...props}) {
  return FlexBox({
    ...props,
    children: function ({className, ...sfcProps}) {
      // merges the default colors and sizes to the theme
      const theme = mergeThemeDefaults({
        defaultTheme,
        themePath,
        props: sfcProps,
        defaults: ['defaultColor', 'defaultSize']
      })
      // adds color class and removes colors from the props
      className = cx(fontColor(sfcProps, theme), className)
      sfcProps = reduceProps(sfcProps, theme.colors)
      // renders the element
      return TypeSFC({
        [theme.defaultSize]: true,
        ...sfcProps,
        className,
        children
      })
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
  margin-bottom: 1rem;
`

export function P ({className, ...props}) {
  return Type({nodeType: 'p', sm: true, className: cx(p, className), ...props})
}


const a = css`
  cursor: pointer;
`

export function A ({className, ...props}) {
  return Type({nodeType: 'a', sm: true, className: cx(a, className), ...props})
}
