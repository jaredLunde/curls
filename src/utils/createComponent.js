import {cx} from 'emotion'
import PropTypes from 'prop-types'
import createOptimized from 'react-cake/es/utils/createOptimized'
import reduceProps from 'react-cake/es/utils/reduceProps'
import getClassNames from './getClassNames'
import getComponentTheme from './getComponentTheme'


const emptyObj = {}


export default function ({
  name,
  propTypes = emptyObj,
  CSS = emptyObj,
  defaultCSS,
  defaultTheme = emptyObj,
  themePath = ''
}) {
  propTypes.children = PropTypes.oneOf([
    PropTypes.element,
    PropTypes.node,
    PropTypes.func
  ]).isRequired

  function SFC (props) {
    const theme = getComponentTheme(defaultTheme, props.theme, themePath)
    const renderProps = reduceProps(props, propTypes)
    renderProps.className = cx(
      defaultCSS,
      getClassNames(propTypes, props, theme, CSS),
      props.className
    )

    return createOptimized(props.children, renderProps)
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    SFC.displayName = name
    SFC.propTypes = propTypes
  }

  return SFC
}
