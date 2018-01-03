import FillViewport from '../FillViewport'
import {FlexBox} from '../Box'
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


export default function ({children, bg = null, ...props}) {
  return FlexBox({
    flex: true,
    column: true,
    align: 'center',
    justify: 'center',
    fw: true,
    pr: true,
    touchScrolling: true,
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
