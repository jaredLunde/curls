import React from 'react'
import {css} from '@emotion/core'
import {useStyles, createElement} from '@style-hooks/core'
import {withChildren, portalize} from './utils'
import {useBox} from './Box'
import {Fade} from './Fade'


/**
<Overlay visible={isVisible}>
  {function ({isVisible, show, hide, toggle}) {

  }}
</Overlay>
**/
const
  defaultStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
  `,
  options = {name: 'overlay'}

export const
  useOverlay = props => useStyles(props, options),
  Overlay = React.forwardRef(({transition = Fade, portal = false, children, ...props}, ref) =>
    React.createElement(
      transition,
      withChildren(
        props,
        ({isVisible, show, hide, toggle, ...other}) => {
          other.css = defaultStyles
          other = useBox(useOverlay(other))
          other.ref = ref
          other.children =
            typeof children === 'function'
              ? children({isVisible, show, hide, toggle})
              : children

          return portalize(createElement('div', other), portal)
        }
      )
    ))

Overlay.defaultProps = {
  bg: 'translucentLight',
}

if (__DEV__) {
  const
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Overlay.displayName = 'Overlay'
  Overlay.propTypes = Object.assign({}, boxPropTypes, flexPropTypes)
}