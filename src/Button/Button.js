import {css} from 'emotion'
import Box from '../Box'
import {flex, row, align, justify} from '../Flex/CSS'
import createComponent, {renderNode} from '../createComponent'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const nodeType = 'button'
const defaultCSS = css`
  ${flex};
  ${row.row};
  ${align.center};
  ${justify.center};
`
const SFC = createComponent({
  name: 'Button',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'button'
})



export default function Button ({className, ...props}) {
  return SFC({
    __buttonStyles: true,
    ...props,
    children: function (boxProps) {
      // this is done so css in defaultTheme.sizes can be overridden
      const sfcClassName = boxProps.className
      // this is done so css in defaultTheme.sizes can be overridden
      boxProps.className = className
      boxProps.children = function (nodeProps) {
        nodeProps.children = props.children
        nodeProps.nodeType = nodeProps.nodeType || nodeType

        return renderNode(nodeProps, [defaultCSS, sfcClassName])
      }

      return Box(boxProps)
    }
  })
}
