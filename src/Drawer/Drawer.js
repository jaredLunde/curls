import React, {useContext} from 'react'
import {css} from '@emotion/core'
import {useStyles, createElement} from '@style-hooks/core'
import emptyObj from 'empty/object'
import {portalize, withChildren, pushCss} from '../utils'
import {useBox} from '../Box'
import {Slide} from '../Slide'
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
const
  defaultStyles = css`
    display: block;
    position: fixed;
    overflow-y: auto;
    z-index: 1000;
  `

export const
  DrawerContext = React.createContext(emptyObj),
  {Consumer: DrawerConsumer} = DrawerContext,
  useDrawerContext = () => useContext(DrawerContext),
  useDrawerBox = props => useStyles('drawer', styles, pushCss(props, defaultStyles)),
  DrawerBox = React.forwardRef(
    ({children, portal, ...props}, ref) => {
      const transition = useDrawerContext()
      props.css = [transition.css]
      props = useBox(useDrawerBox(props))
      props.children = typeof children === 'function' ? children(transition) : children
      props.ref = ref
      return portalize(createElement('div', props), portal)
    }
  ),
  Drawer = props => React.createElement(
    props.transition || Slide,
    withChildren(
      props,
      transition => <DrawerContext.Provider value={transition} children={props.children(transition)}/>
    )
  )

if (__DEV__) {
  const slidePropTypes = require('../Slide/propTypes').default
  Drawer.displayName = 'Drawer'
  DrawerBox.displayName = 'DrawerBox'
  Drawer.propTypes = slidePropTypes
}