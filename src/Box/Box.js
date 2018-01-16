import gridPropTypes from '../Grid/propTypes'
import * as gridCSS from '../Grid/CSS'
import * as gridDefaultTheme from '../Grid/defaultTheme'
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

export const GridBox = createComponent({
  name: 'GridBox',
  propTypes: {...gridPropTypes, ...flexPropTypes, ...propTypes},
  CSS: {...gridCSS, ...flexCSS, ...CSS},
  defaultTheme: {...gridDefaultTheme, ...defaultTheme}
})


export default FlexBox
