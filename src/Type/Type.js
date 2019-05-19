import React from 'react'
import {renderNode} from '../createComponent'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'
import {useBox} from '../Box/Box'


const options = {name: 'type', styles, defaultTheme}
export const useType = props => useStyles(props, options)
const Type = React.forwardRef(
  (props, ref) => {
    props = useBox(useType(props, options))
    props.as = props.as || 'span'
    props.ref = ref
    return renderNode(props)
  }
)

if (__DEV__) {
  Type.displayName = 'Type'
  Type.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}

export default Type