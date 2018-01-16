import Box from '../Box'
import {createComponent, renderNode} from '../utils'
import * as defaultTheme from './defaultTheme'


const nodeType = 'div'
const SFC = createComponent({name: 'Row', defaultTheme})


export default function Row (props) {
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
