import Grid from '../Grid'
import flexPropTypes from '../Flex/propTypes'
import * as flexCSS from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {createSFC} from '../utils'


export const Box = createSFC({name: 'BasicBox', propTypes, CSS, defaultTheme})

export const FlexBox = createSFC({
  name: 'FlexBox',
  propTypes: {...flexPropTypes, ...propTypes},
  CSS: {...flexCSS, ...CSS},
  defaultTheme
})

export default function (props) {
  return Grid({
    ...props,
    children: function (gridProps) {
      return FlexBox({...gridProps, children: props.children})
    }
  })
}
