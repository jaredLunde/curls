import {css, cx} from 'emotion'
import {FlexBox} from '../Box'
import {createSFCNode, mergeThemeProp} from '../utils'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'

/**
<Type bold xxl color='white' face='primary'>

</Type>
*/
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
    children: function (sfcProps) {
      // merges the default colors and sizes to the theme
      const theme = mergeThemeProp(defaultTheme, sfcProps, themePath)

      // renders the element
      sfcProps = {
        face: theme.defaultFace,
        color: theme.defaultColor,
        ...sfcProps,
        children
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
  margin-bottom: 1rem;
`

export function P ({className, ...props}) {
  return Type({nodeType: 'p', className: cx(p, className), ...props})
}
