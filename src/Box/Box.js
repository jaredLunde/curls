import Grid from '../Grid'
import flexPropTypes from '../Flex/propTypes'
import * as flexCSS from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {createFactory} from '../utils'


export const BasicBox = createFactory({name: 'BasicBox', propTypes, CSS, defaultTheme})

export const FlexBox = createFactory({
  name: 'FlexBox',
  propTypes: {...flexPropTypes, ...propTypes},
  CSS: {...flexCSS, ...CSS},
  defaultTheme
})

export default function (props) {
  return Grid({
    ...props,
    children: function (gridProps) {
      gridProps.children = props.children
      return FlexBox(gridProps)
    }
  })
}
