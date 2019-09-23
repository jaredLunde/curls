import React, {useContext, useRef} from 'react'
import {css} from '@emotion/core'
import {useStyles, createElement} from '@style-hooks/core'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import useMergedRef from '@react-hook/merged-ref'
import {Button} from '../Button'
import {portalize, pushCss} from '../utils'
import {useBox} from '../Box'
import {useSlide} from '../Slide'
import * as styles from './styles'

/**
<Drawer fromBottom>
  {({toggle, isVisible}) => {
    return (
      <>
        <DrawerBox portal bg='black'>
          {({isVisible, hide}) => {
            return (
              <Type>
                Is visible? {String(isVisible)}

                <Button onClick={hide}>
                  Close
                </Button>
              </Type>
            )
          }}
        </DrawerBox>

        <Button onClick={toggle}>
          Open
        </Button>
      </>
    )
  }}
</Drawer>
*/
const defaultStyles = css`
  display: block;
  position: fixed;
  overflow-y: auto;
  z-index: 1000;
`

let ID = 0

export const DrawerContext = React.createContext({}),
  {Consumer: DrawerConsumer} = DrawerContext,
  useDrawerContext = () => useContext(DrawerContext),
  useDrawerBox = props => {
    const context = useDrawerContext()
    props = useStyles(
      'drawer',
      styles,
      pushCss(props, [defaultStyles, context.css])
    )
    props.id = props.id || context.id
    props.tabIndex = props.tabIndex || '0'
    return props
  },
  DrawerToggle = React.forwardRef((props, ref) => {
    const context = useDrawerContext()
    props = Object.assign(
      {
        tabIndex: 0,
        'aria-controls': context.id,
        'aria-haspopup': 'true',
        'aria-expanded': String(context.isVisible),
        ref,
      },
      props
    )
    props.onClick = context.toggle
    return createElement(Button, props)
  }),
  DrawerBox = React.forwardRef(({children, portal, ...props}, ref) => {
    const context = useDrawerContext()
    const focusRef = useRef(null)

    useLayoutEffect(() => {
      if (context.isVisible) setTimeout(() => focusRef.current.focus(), 100)
    }, [context.isVisible])

    props = useBox(useDrawerBox(props))
    props.children =
      typeof children === 'function' ? children(context) : children
    props.ref = useMergedRef(ref, focusRef)
    return portalize(createElement('div', props), portal)
  }),
  Drawer = props => {
    const context = (props.transition || useSlide)(props)
    context.id = useRef(`curls.drawer.${ID++}`).current
    return (
      <DrawerContext.Provider
        value={context}
        children={
          typeof props.children === 'function'
            ? props.children(context)
            : props.children
        }
      />
    )
  }

if (__DEV__) {
  const slidePropTypes = require('../Slide/propTypes').default
  Drawer.displayName = 'Drawer'
  DrawerBox.displayName = 'DrawerBox'
  Drawer.propTypes = slidePropTypes
}
