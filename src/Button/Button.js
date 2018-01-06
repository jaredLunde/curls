import {css, cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import {FlexBox} from '../Box'
import {flex, row, align} from '../Flex/CSS'
import {createSFCNode, mergeThemeDefaults} from '../utils'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {buttonColor} from './utils'


const themePath = 'button'
const ButtonSFC = createSFCNode({
  name: 'Button',
  propTypes,
  CSS,
  defaultTheme,
  themePath,
  defaultNodeType: 'button'
})
const buttonCSS = css`
  ${flex};
  ${row};
  ${align.center};
`


export default function Button ({
  nodeType = 'button',
  children,
  br = null,
  bw = null,
  bc = null,
  bs = null,
  bg,
  className,
  ...props
}) {
  if (nodeType !== 'button') {
    props.role = 'button'
  }

  const theme = mergeThemeDefaults({
    defaultTheme,
    themePath,
    props: props,
    defaults: ['defaultColor', 'defaultSize']
  })

  return FlexBox({
    className: cx(buttonCSS, className),
    nodeType,
    bs: theme.defaultBoxShadow,
    ...props,
    children: function ({className, ...sfcProps}) {
      // merges the default colors and sizes to the theme

      // adds color class and removes colors from the props
      className = cx(buttonColor(sfcProps, theme), className)
      sfcProps = reduceProps(sfcProps, theme.colors)
      // renders the element
      return ButtonSFC({
        [theme.defaultSize]: true,
        br,
        bw,
        bc,
        ...sfcProps,
        className,
        children
      })
    }
  })
}
