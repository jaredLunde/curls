import {css} from 'emotion'
import {GridBox} from '../Box'
import {createComponent, renderNode} from '../utils'
import * as defaultTheme from './defaultTheme'


const defaultCSS = css`min-width: 0;`
const nodeType = 'div'
const SFC = createComponent({name: 'Col', defaultTheme, defaultCSS})



export default function Type (props) {
  return SFC({
    ...props,
    children: function (boxProps) {
      boxProps.children = function (nodeProps) {
        nodeProps.children = props.children
        nodeProps.nodeType = nodeProps.nodeType || nodeType
        return renderNode(nodeProps)
      }

      return GridBox(boxProps)
    }
  })
}
