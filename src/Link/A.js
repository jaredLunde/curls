import React from 'react'
import {useType} from '../Type'
import createElement from '../createElement'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import {useBox} from '../Box'
import useStyles from '../useStyles'


const
  options = {name: 'link', styles, defaultTheme},
  useLink = props =>
    useBox(useType(useStyles(Object.assign({__linkStyles: true}, props), options))),
  A = React.forwardRef(
    (props, ref) => {
      props = useLink(props)
      props.ref = ref
      return createElement('a', props)
    }
  )

if (__DEV__) {
  const
    typePropTypes = require('../Type/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  A.displayName = 'A'
  A.propTypes = Object.assign({}, boxPropTypes, typePropTypes, flexPropTypes)
}

export {useLink}
export default A