import {css} from 'emotion'
import {createComponent, renderNode} from '../utils'
import Box from '../Box'
import {w, d, pos} from '../Box/CSS'
import propTypes from './propTypes'
import * as defaultTheme from './defaultTheme'
import * as CSS from './CSS'


const emptyObj = {}
const nodeType = 'div'
const defaultCSS = css`
  ${w('100%')};
  ${d.block};
  ${pos.relative};
  clear: both;
`
const SFC = createComponent({
  name: 'Divider',
  propTypes,
  CSS,
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

      return Box(boxProps)
    }
  })
}
