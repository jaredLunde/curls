import {css} from 'emotion'
import {pos, w} from '../Box/CSS'
import {flex, row, wrap} from '../Flex/CSS'
import Box from '../Box'
import createComponent, {renderNode} from '../createComponent'


const nodeType = 'div'
const defaultCSS = css`
  ${pos.relative};
  ${w('100%')};
  ${flex};
  ${row.row};
  ${wrap.wrap};
`
const SFC = createComponent({name: 'Row', themePath: 'row'})


export default function Row (props) {
  return SFC({
    ...props,
    children: function (boxProps) {
      boxProps.children = function (nodeProps) {
        nodeProps.children = props.children
        nodeProps.nodeType = nodeProps.nodeType || nodeType
        return renderNode(nodeProps, defaultCSS)
      }

      return Box(boxProps)
    }
  })
}
