import {css} from 'emotion'
import {createComponent, renderNode} from '../utils'
import {BasicBox} from '../Box'
import {w, h, d, pos} from '../Box/CSS'
import * as defaultTheme from './defaultTheme'


const emptyObj = {}
const nodeType = 'div'
const defaultCSS = css`
  ${w('100%')};
  ${h(1)};
  ${d.block};
  ${pos.relative};
  clear: both;
`
const SFC = createComponent({
  name: 'Divider',
  defaultTheme,
  themePath: 'divider'
})


export default function Divider (props = emptyObj) {
  return SFC({
    ...props,
    children: function (boxProps) {
      boxProps.children = function (nodeProps) {
        nodeProps.children = props.children
        nodeProps.nodeType = nodeProps.nodeType || nodeType
        return renderNode(nodeProps, defaultCSS)
      }

      return BasicBox(boxProps)
    }
  })
}
