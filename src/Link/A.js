import React from 'react'
import {useType} from '../Type'
import {renderNode} from '../createComponent'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import typePropTypes from '../Type/propTypes'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import {useBox} from '../Box'
import useStyles from '../useStyles'


const
  options = {name: 'link', styles, defaultTheme},
  A = React.forwardRef(
    (props, ref) => {
      props = Object.assign({__linkStyles: true}, props)
      props = useBox(useType(useStyles(props, options)))
      props.as = props.as || 'a'
      props.ref = ref
      return renderNode(props)
    }
  )

if (__DEV__) {
  A.displayName = 'A'
  A.propTypes = Object.assign({}, boxPropTypes, typePropTypes, flexPropTypes)
}

export default A