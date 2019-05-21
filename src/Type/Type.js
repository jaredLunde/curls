import React from 'react'
import createElement from '../createElement'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'
import {useBox} from '../Box/Box'


const
  options = {name: 'type', styles, defaultTheme},
  useType = props => useStyles(props, options),
  Type = React.forwardRef(
    (props, ref) => {
      props = useBox(useType(props))
      props.ref = ref
      return createElement('span', props)
    }
  )

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Type.displayName = 'Type'
  Type.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}

export {useType}
export default Type