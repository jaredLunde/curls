import React, {useContext} from 'react'
import {css} from '@emotion/core'
import {useStyles, createElement} from '@style-hooks/core'
import emptyObj from 'empty/object'
import {Button} from '../Button'
import {portalize, pushCss} from '../utils'
import {useBox} from '../Box'
import {useSlide} from '../Slide'
import * as styles from './styles'
import {useModalContext} from '../Modal'

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

export const DrawerContext = React.createContext(emptyObj),
  {Consumer: DrawerConsumer} = DrawerContext,
  useDrawerContext = () => useContext(DrawerContext),
  useDrawerBox = props =>
    useStyles('drawer', styles, pushCss(props, defaultStyles)),
  DrawerToggle = React.forwardRef((props, ref) => {
    const context = useModalContext()
    props = Object.assign({ref}, props)
    props.onClick = context.toggle
    return createElement(Button, props)
  }),
  DrawerBox = React.forwardRef(({children, portal, ...props}, ref) => {
    const transition = useDrawerContext()
    props.css = Array.isArray(transition.css)
      ? [...transition.css]
      : [transition.css]
    props = useBox(useDrawerBox(props))
    props.children =
      typeof children === 'function' ? children(transition) : children
    props.ref = ref
    return portalize(createElement('div', props), portal)
  }),
  Drawer = props => {
    const context = (props.transition || useSlide)(props)
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
