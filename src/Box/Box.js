import gridPropTypes from '../Grid/propTypes'
import * as gridCSS from '../Grid/CSS'
import * as gridDefaultTheme from '../Grid/defaultTheme'
import flexPropTypes from '../Flex/propTypes'
import * as flexCSS from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import createComponent, {renderNode} from '../createComponent'


export const BasicBox = createComponent({
  name: 'BasicBox',
  propTypes,
  CSS,
  themePath: 'box',
  defaultTheme
})

export const FlexBox = createComponent({
  name: 'Box',
  propTypes: {...flexPropTypes, ...propTypes},
  CSS: {...flexCSS, ...CSS},
  themePath: 'box',
  defaultTheme
})

export const GridBox = createComponent({
  name: 'GridBox',
  propTypes: {...gridPropTypes, ...flexPropTypes, ...propTypes},
  CSS: {...gridCSS, ...flexCSS, ...CSS},
  themePath: 'box',
  defaultTheme: {...gridDefaultTheme, ...defaultTheme}
})


export default function Box (props) {
  return FlexBox({
    ...props,
    children: function (boxProps) {
      boxProps.nodeType = boxProps.nodeType || 'div'
      boxProps.children = props.children
      return renderNode(boxProps)
    }
  })
}
