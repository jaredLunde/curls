import React from 'react'
import {useTheme} from '../ThemeConsumer'
import A from './A'


const Link = React.forwardRef(
  (props, ref) => {
    const theme = useTheme()

    if (__DEV__)
      if (!theme?.link?.component)
        throw (
          'You must define a `component` property in your '
          + '`theme.link` to use the Link component'
        )

    return React.createElement(A, Object.assign({as: theme.link.component, ref}, props))
  }
)

if (__DEV__) Link.displayName = 'Link'
export default Link