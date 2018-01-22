import {css} from 'emotion'
import FillViewport from '../FillViewport'
import Box from '../Box'
import {flex, column, align, justify} from '../Flex/CSS'
import {w, pos, touchScrolling} from '../Box/CSS'
import createComponent, {renderNode} from '../createComponent'
import {getStyle} from './utils'


const nodeType = 'div'
const defaultCSS = css`
  ${flex};
  ${column.column};
  ${align.center};
  ${justify.center};
  ${w('100%')};
  ${pos.relative};
  ${touchScrolling};
`
const SFC = createComponent({name: 'Hero', themePath: 'hero'})


export default function Hero (props) {
  return SFC({
    ...props,
    children: function (vpProps) {
      return FillViewport({
        ...vpProps,
        children: function ({trimHeight, style, ...boxProps}) {
          boxProps.children = function (nodeProps) {
            nodeProps.children = props.children
            nodeProps.nodeType = nodeProps.nodeType || nodeType
            nodeProps.style = getStyle(style, trimHeight)
            return renderNode(nodeProps, defaultCSS)
          }

          return Box(boxProps)
        }
      })
    }
  })
}
