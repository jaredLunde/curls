import {useStyles, useTheme} from '@style-hooks/core'
import createComponent from '../createComponent'
import {useBox} from '../Box/Box'
import {getBreakpointOrder} from '../utils'
import * as styles from './styles'

export const useFlexGrid = props => {
    let theme = useTheme(),
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

    return useStyles('flexGrid', styles, nextProps)
  },
  FlexGrid = createComponent('div', props => useBox(useFlexGrid(props)))

if (__DEV__) {
  const propTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  FlexGrid.displayName = 'FlexGrid'
  FlexGrid.propTypes = Object.assign({}, flexPropTypes, propTypes)
}
