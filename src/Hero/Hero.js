import {css, cx} from 'emotion'
import FillViewport from '../FillViewport'
import Box from '../Box'
import {flex, column, align, justify} from '../Flex/CSS'
import {w, pos, touchScrolling} from '../Box/CSS'
import {createNode} from '../utils'
import {getStyle} from './utils'
import propTypes from './propTypes'
import * as defaultTheme from './defaultTheme'
import * as CSS from './CSS'


const themePath = 'hero'
const defaultCSS = css`
  ${flex};
  ${column.column};
  ${align.center};
  ${justify.center};
  ${w('100%')};
  ${pos.relative};
  ${touchScrolling};
`
const HeroSFC = createNode({
  name: 'Hero',
  propTypes,
  CSS,
  defaultTheme,
  defaultCSS,
  themePath,
  defaultNodeType: 'div'
})


export default function ({children, bg = null, ...props}) {
  return Box({
    ...props,
    children: function (vpProps) {
      return FillViewport({
        ...vpProps,
        children: function ({trimHeight, style, ...heroProps}) {
          style = getStyle(style, trimHeight)
          return HeroSFC({bg, ...heroProps, style, children})
        }
      })
    }
  })
}
