import Grid from '../Grid'
import flexPropTypes from '../Flex/propTypes'
import * as flexCSS from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import {createComponent} from '../utils'


export const BasicBox = createComponent({
  name: 'BasicBox',
  propTypes,
  CSS,
  defaultTheme
})

export const FlexBox = createComponent({
  name: 'Box',
  propTypes: {...flexPropTypes, ...propTypes},
  CSS: {...flexCSS, ...CSS},
  defaultTheme
})

export function GridBox (props) {
  return Grid({
    ...props,
    children: function (gridProps) {
      gridProps.children = props.children
      return FlexBox(gridProps)
    }
  })
}

export default FlexBox
