import {css} from 'emotion'
import {FlexBox} from '../Box'
import {flex, row, align} from '../Flex/CSS'
import {createSFCNode, getComponentTheme} from '../utils'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'


const themePath = 'button'
const defaultCSS = css`
  ${flex};
  ${row};
  ${align.center};
`
const ButtonSFC = createSFCNode({
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

  return FlexBox({
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
