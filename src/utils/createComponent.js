import {cx} from 'emotion'
import PropTypes from 'prop-types'
import createOptimized from 'react-cake/es/utils/createOptimized'
import reduceProps from 'react-cake/es/utils/reduceProps'
import getClassNames from './getClassNames'
import getComponentTheme from './getComponentTheme'
import assignOrdered from './assignOrdered'


const emptyObj = {}


export default function ({
  name,
  propTypes = emptyObj,
  CSS = emptyObj,
  defaultTheme = emptyObj,
  themePath = ''
}) {
  if (defaultTheme !== emptyObj) {
    // translates __esModule stuff to plain obj
    defaultTheme = {...defaultTheme}
  }

  function SFC (props) {
    const theme = getComponentTheme(defaultTheme, props.theme, themePath)
    props = theme.defaultProps ? assignOrdered(theme.defaultProps, props) : props

    const renderProps = (
      propTypes === emptyObj
      ? Object.assign({}, props)
      : reduceProps(props, propTypes)
    )
    delete renderProps.children

    if (CSS !== emptyObj) {
      renderProps.className = cx(getClassNames(props, theme, CSS), props.className)
    }


    return props.children(renderProps)
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    SFC.displayName = name
    SFC.propTypes = propTypes
  }

  return SFC
}
