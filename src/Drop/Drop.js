import {useStyles} from '@style-hooks/core'
import createRenderProp from '../createRenderProp'
import useToggleVisibility from '../useToggleVisibility'
import {assignDefaults} from '../utils'
import * as styles from './styles'

export const useDrop = props =>
    useToggleVisibility(
      props => useStyles('drop', styles, props),
      assignDefaults(
        {property: 'visibility, transform, opacity', fromBottom: true},
        props
      )
    ),
  Drop = createRenderProp(useDrop)

if (__DEV__) {
  const propTypes = require('../Slide/propTypes').default
  Drop.displayName = 'Drop'
  Drop.propTypes = propTypes
}
