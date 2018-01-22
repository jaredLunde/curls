import {css, cx} from 'emotion'
import Box from '../Box'
import createComponent, {renderNode} from '../createComponent'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


/**
<Type bold xxl color='white' face='primary'>

</Type>
*/
const nodeType = 'span'
const SFC = createComponent({
  name: 'Type',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'type'
})



export default function Type (props) {
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

export function H1 (props) {
  return Type({nodeType: 'h1', xxl: true, ...props})
}

export function H2 (props) {
  return Type({nodeType: 'h2', xl: true, ...props})
}

export function H3 (props) {
  return Type({nodeType: 'h3', lg: true, ...props})
}

export function H4 (props) {
  return Type({nodeType: 'h4', md: true, ...props})
}

export function H5 (props) {
  return Type({nodeType: 'h5', sm: true, ...props})
}

export function H6 (props) {
  return Type({nodeType: 'h6', sm: true, ...props})
}

const p = css`
  word-break: break-word;
  line-height: 1.4;
`

export function P (props) {
  return Type({nodeType: 'p', m: 'b2', ...props, className: cx(p, props.className)})
}
