import React from 'react'
import {css} from '@emotion/core'
import {useType} from '../Type'
import createElement from '../createElement'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import {useBox} from '../Box'
import useStyles from '../useStyles'


const
  defaultStyles = css`text-decoration: none;`,
  options = {name: 'link', styles, defaultStyles, defaultTheme},
  useLink = props => useStyles(Object.assign({__linkStyles: true}, props), options),
  A = React.forwardRef(
    (props, ref) => {
      props = useBox(useType(useLink(props)))
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