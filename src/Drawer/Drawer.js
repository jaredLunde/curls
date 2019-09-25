import React, {useContext, useMemo, useRef} from 'react'
import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import useSwitch from '@react-hook/switch'
import createAriaPopupToggle from '../createAriaPopupToggle'
import createAriaPopup from '../createAriaPopup'
import {pushCss, objectWithoutProps} from '../utils'
import {useSlide} from '../Slide'
import * as styles from './styles'
/**
<Drawer fromBottom>
  {({toggle, isOpen}) => {
    return (
      <>
        <DrawerBox portal bg='black'>
          {({isOpen, hide}) => {
            return (
              <Text>
                Is visible? {String(isOpen)}

                <Button onClick={hide}>
                  Close
                </Button>
              </Text>
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
const withoutSlide = {
  fromTop: 0,
  fromRight: 0,
  fromBottom: 0,
  fromLeft: 0,
  duration: 0,
  easing: 0,
}

// TODO: themeable DrawerToggle, ModalToggle, etc
//       props = useStyles('drawerToggle', {}, props)
//       entirely for defaultProps and kinds
export const DrawerContext = React.createContext({}),
  {Consumer: DrawerConsumer} = DrawerContext,
  useDrawerContext = () => useContext(DrawerContext),
  useDrawerBox = props => {
    const context = useDrawerContext()
    let nextProps = useStyles('drawer', styles, pushCss(props, [defaultStyles]))
    nextProps = objectWithoutProps(nextProps, withoutSlide)
    return pushCss(
      nextProps,
      useSlide(
        Object.assign(
          {visible: context.isOpen, fromLeft: true, duration: 'fast'},
          props
        )
      ).css
    )
  },
  DrawerToggle = createAriaPopupToggle(useDrawerContext),
  DrawerBox = createAriaPopup(useDrawerContext, useDrawerBox),
  Drawer = ({open, children}) => {
    let [isOpen, toggle] = useSwitch(false, open)
    isOpen = open === void 0 || open === null ? isOpen : open
    const id = useRef(`curls.drawer.${ID++}`)
    const context = useMemo(
      () => ({
        id: id.current,
        show: toggle.on,
        hide: toggle.off,
        toggle: toggle,
        isOpen,
      }),
      [isOpen, toggle.on, toggle.off, toggle]
    )

    return (
      <DrawerContext.Provider
        value={context}
        children={typeof children === 'function' ? children(context) : children}
      />
    )
  }

if (__DEV__) {
  const slidePropTexts = require('../Slide/propTypes').default
  Drawer.displayName = 'Drawer'
  DrawerBox.displayName = 'DrawerBox'
  Drawer.propTypes = slidePropTexts
}
