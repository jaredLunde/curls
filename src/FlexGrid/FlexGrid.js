import {useStyles, useTheme} from '@style-hooks/core'
import * as styles from './styles'
import {getBreakpointOrder} from '../utils'
import {useBox} from '../Box/Box'
import createComponent from '../createComponent'


const options = {name: 'flexGrid', styles}
export const
  useFlexGrid = props => {
    let
      theme = useTheme(options.name),
      found = false,
      nextProps = Object.assign({}, {__gridBreakpoints: {}}),
      breakpointOrder = getBreakpointOrder(theme.breakpoints),
      i = 0

    for (; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i]
      if (props[bp] !== void 0) {
        nextProps.__gridBreakpoints[bp] = props[bp]
        found = true
      }
    }

    if (found === false) return props

    const propKeys = Object.keys(props)
    for (i = 0; i < propKeys.length; i++) {
      const key = propKeys[i]
      if (nextProps.__gridBreakpoints[key] === void 0)
        nextProps[key] = props[key]
    }

    return useStyles(nextProps, options)
  },
  FlexGrid = createComponent('div', props => useBox(useFlexGrid(props)))

if (__DEV__) {
  const
    propTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  FlexGrid.displayName = 'FlexGrid'
  FlexGrid.propTypes = Object.assign({}, flexPropTypes, propTypes)
}