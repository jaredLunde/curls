import React from 'react'
import {useLink} from './A'
import {useTheme} from '../ThemeConsumer'
import createElement from '../createElement'
import {useBox} from '../Box'
import {useType} from '../Type'


const Link = React.forwardRef(
  (props, ref) => {
    const theme = useTheme()

    if (__DEV__)
      if (!theme?.link?.component)
        throw (
          'You must define a `component` property in your '
          + '`theme.link` to use the Link component'
        )

    props = useBox(useType(useLink(props)))
    props.ref = ref
    return createElement(theme.link.component, props)
  }
)

if (__DEV__) Link.displayName = 'Link'
export default Link