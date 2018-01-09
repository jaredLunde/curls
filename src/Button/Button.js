import {css} from 'emotion'
import Box from '../Box'
import {flex, row, align} from '../Flex/CSS'
import {createNode, getComponentTheme} from '../utils'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const themePath = 'button'
const defaultCSS = css`
  ${flex};
  ${row};
  ${align.center};
`
const ButtonSFC = createNode({
  name: 'Button',
  propTypes,
  CSS,
  defaultTheme,
  themePath,
  defaultCSS,
  defaultNodeType: 'button'
})


export default function Button ({
  nodeType = 'button',
  children,
  br = null,
  bw = null,
  bc = null,
  bg = null,
  bs = null,
  ...props
}) {
  if (nodeType !== 'button') {
    props.role = 'button'
  }
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)

  return Box({
    nodeType,
    ...props,
    children: function (sfcProps) {
      // renders the element
      return ButtonSFC({
        [theme.defaultSize]: true,
        br,
        bw,
        bc,
        bg,
        bs,
        ...sfcProps,
        children
      })
    }
  })
}
