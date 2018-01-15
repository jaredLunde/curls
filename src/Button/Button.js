import Box from '../Box'
import {flex, row, align, justify} from '../Flex/CSS'
import {createComponent, renderNode} from '../utils'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const nodeType = 'button'
const SFC = createComponent({
  name: 'Button',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'button'
})



export default function Button (props) {
  return SFC({
    ...props,
    children: function (boxProps) {
      boxProps.children = function (nodeProps) {
        nodeProps.children = props.children
        nodeProps.nodeType = nodeProps.nodeType || nodeType
        return renderNode(nodeProps)
      }

      return Box(boxProps)
    }
  })
}
