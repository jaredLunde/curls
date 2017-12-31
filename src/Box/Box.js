import gridPropTypes from '../Grid/propTypes'
import * as gridCSS from '../Grid/CSS'
import flexPropTypes from '../Flex/propTypes'
import * as flexCSS from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {createSFC} from '../utils'


export const Box = createSFC({
  name: 'Box',
  propTypes: {
    ...flexPropTypes,
    ...propTypes
  },
  CSS: {
    ...flexCSS,
    ...CSS
  },
  defaultTheme
})


export default createSFC({
  name: 'Box',
  propTypes: {
    ...gridPropTypes,
    ...flexPropTypes,
    ...propTypes
  },
  CSS: {
    ...gridCSS,
    ...flexCSS,
    ...CSS
  },
  defaultTheme
})
