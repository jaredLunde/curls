import {css} from 'emotion'
import Type from '../Type'
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



export default function Button ({className, children, ...props}) {
  return SFC({
    __buttonStyles: true,
    ...props,
    children: function (typeProps) {
      // this is done so css in defaultTheme.sizes can be overridden
      typeProps.className = [defaultCSS, typeProps.className, className]
      typeProps.children = children
      typeProps.nodeType = typeProps.nodeType || nodeType
      return Type(typeProps)
    }
  })
}
