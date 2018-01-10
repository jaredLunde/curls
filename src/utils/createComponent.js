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
  function SFC (props) {
    const theme = getComponentTheme(defaultTheme, props.theme, themePath)
    const renderProps = reduceProps(props, propTypes)
    renderProps.className = cx(
      defaultCSS,
      getClassNames(props, theme, CSS),
      props.className
    )
    delete renderProps.children

    return createOptimized(props.children, renderProps)
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    SFC.displayName = name
    SFC.propTypes = propTypes
  }

  return SFC
}
