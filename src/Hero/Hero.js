import {css, cx} from 'emotion'
import FillViewport from '../FillViewport'
import {FlexBox} from '../Box'
import {flex, column, align, justify} from '../Flex/CSS'
import {fw, pr, touchScrolling} from '../Box/CSS'
import {createSFCNode} from '../utils'
import {getStyle} from './utils'
import propTypes from './propTypes'
import defaultTheme from './defaultTheme'
import * as CSS from './CSS'


const themePath = 'hero'
const HeroSFC = createSFCNode({
  name: 'Hero',
  propTypes,
  CSS,
  defaultTheme,
  themePath,
  defaultNodeType: 'div'
})
const heroCSS = css`
  ${flex};
  ${column};
  ${align.center};
  ${justify.center};
  ${fw};
  ${pr};
  ${touchScrolling};
`

export default function ({children, bg = null, className, ...props}) {
  return FlexBox({
    /**
    flex: true,
    column: true,
    align: 'center',
    justify: 'center',
    fw: true,
    pr: true,
    touchScrolling: true,
    */
    className: cx(heroCSS, className),
    ...props,
    children: function (vpProps) {
      return FillViewport({
        ...vpProps,
        children: function ({trimHeight, style, ...heroProps}) {
          style = getStyle(style, trimHeight)
          return HeroSFC({...heroProps, bg, style, children})
        }
      })
    }
  })
}
