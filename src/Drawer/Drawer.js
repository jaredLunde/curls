import React, {useContext, useRef} from 'react'
import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import createAriaPopupToggle from '../createAriaPopupToggle'
import createAriaPopup from '../createAriaPopup'
import {pushCss} from '../utils'
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
    props = useStyles('drawer', styles, pushCss(props, defaultStyles))
    return props
  },
  DrawerToggle = createAriaPopupToggle(useDrawerContext),
  DrawerBox = createAriaPopup(useDrawerContext, useDrawerBox),
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
