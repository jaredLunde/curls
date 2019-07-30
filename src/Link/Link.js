import React from 'react'
import {useTheme, createElement} from '@style-hooks/core'
import {useBox} from '../Box'
import {useText} from '../Text'
import {useLink} from './A'


export const createLink = themeName => React.forwardRef((props, ref) => {
  const theme = useTheme()

  if (__DEV__)
    if (!theme?.[themeName]?.component)
      throw (
        'You must define a `component` property in your '
        + `'theme.${themeName}' to use the ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} component`
      )

  props = useBox(useText(useLink(props)))
  props.ref = ref
  return createElement(theme[themeName].component, props)
})

const Link = createLink('link')
export default Link

if (__DEV__) {
  const
    typePropTypes = require('../Type/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Link.displayName = 'Link'
  Link.propTypes = Object.assign({}, boxPropTypes, typePropTypes, flexPropTypes)
}