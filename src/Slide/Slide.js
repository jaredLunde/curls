import {useStyles} from '@style-hooks/core'
import createRenderProp from '../createRenderProp'
import useToggleVisibility from '../useToggleVisibility'
import * as styles from './styles'

export const useSlide = props =>
    useToggleVisibility(
      props => useStyles('slide', styles, props),
      Object.assign({property: 'visibility, transform'}, props)
    ),
  Slide = createRenderProp(useSlide)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Slide.displayName = 'Slide'
  Slide.propTypes = propTypes
}
