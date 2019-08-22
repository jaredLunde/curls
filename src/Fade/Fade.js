import {useStyles} from '@style-hooks/core'
import createRenderProp from '../createRenderProp'
import useToggleVisibility from '../useToggleVisibility'
import * as styles from './styles'

export const useFade = props => {
    props = Object.assign({}, props)
    props.from = props.from || 0
    props.to = props.to === void 0 ? 1 : props.to
    return useToggleVisibility(
      props => useStyles('fade', styles, props),
      Object.assign({property: 'visibility, opacity'}, props)
    )
  },
  Fade = createRenderProp(useFade)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Fade.displayName = 'Fade'
  Fade.propTypes = propTypes
}
