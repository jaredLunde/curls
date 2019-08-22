import {useStyles} from '@style-hooks/core'
import createRenderProp from '../createRenderProp'
import useToggleVisibility from '../useToggleVisibility'
import * as styles from './styles'

export const useDrop = props =>
    useToggleVisibility(
      props => useStyles('drop', styles, props),
      Object.assign({property: 'visibility, transform, opacity'}, props)
    ),
  Drop = createRenderProp(useDrop)

if (__DEV__) {
  const propTypes = require('../Slide/propTypes').default
  Drop.displayName = 'Drop'
  Drop.propTypes = propTypes
}
