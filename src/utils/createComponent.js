import React from 'react'
import {cx} from 'emotion'
import PropTypes from 'prop-types'
import reduceProps from 'react-cake/es/utils/reduceProps'
import getClassNames from './getClassNames'
import getComponentTheme from './getComponentTheme'
import assignOrdered from './assignOrdered'
import ThemeConsumer from '../ThemeConsumer'


export default function ({
  name,
  CSS,
  propTypes,
  defaultTheme,
  themePath
}) {
  if (defaultTheme !== void 0) {
    // translates __esModule stuff to plain obj
    defaultTheme = {...defaultTheme}
  }

  if (themePath === void 0) {
    throw new Error(`[${name}] Curls components must be initialized with a 'themePath' option set.`)
  }

  function SFC (props) {
    return (
      <ThemeConsumer path={themePath}>
        {function (themeProps) {
          const theme = getComponentTheme(defaultTheme, themeProps.theme)
          props = (
            theme.defaultProps === void 0
            ? props
            : assignOrdered(theme.defaultProps, props)
          )
          const renderProps = (
            propTypes === void 0
            ? Object.assign({}, props)
            : reduceProps(props, propTypes)
          )
          delete renderProps.children

          if (CSS !== void 0) {
            const classNames = getClassNames(props, theme, CSS)

            if (classNames !== void 0) {
              renderProps.className = cx(classNames, props.className)
            }
          }


          return props.children(renderProps)
        }}
      </ThemeConsumer>
    )
    /**
    const theme = getComponentTheme(defaultTheme, props.theme)
    props = (
      theme.defaultProps === void 0
      ? props
      : assignOrdered(theme.defaultProps, props)
    )
    const renderProps = (
      propTypes === void 0
      ? Object.assign({}, props)
      : reduceProps(props, propTypes)
    )
    delete renderProps.children

    if (CSS !== void 0) {
      const classNames = getClassNames(props, theme, CSS)

      if (classNames !== void 0) {
        renderProps.className = cx(classNames, props.className)
      }
    }


    return props.children(renderProps)
    */
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    SFC.displayName = name
    SFC.propTypes = propTypes
  }

  return SFC
}
