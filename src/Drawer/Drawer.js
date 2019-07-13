import React, {useContext} from 'react'
import emptyObj from 'empty/object'
import {css} from '@emotion/core'
import {portalize, withChildren} from '../utils'
import {useBox} from '../Box'
import Slide from '../Slide'
import createElement from '../createElement'
import {d, pos, ov} from '../Box/styles'
import * as styles from './styles'
import useStyles from '../useStyles'


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
    ${d.block};
    ${pos.fixed};
    ${ov.autoY};
    z-index: 1000;
  `,
  options = {name: 'drawer', styles, defaultStyles},
  DrawerContext = React.createContext(emptyObj),
  {Consumer, Provider} = DrawerContext

export const
  DrawerConsumer = Consumer,
  useDrawerContext = () => useContext(DrawerContext),
  useDrawerBox = props => useStyles(props, options),
  DrawerBox = React.forwardRef(
    ({children, portal, ...props}, ref) => {
      props = useBox(useDrawerBox(props))
      const transition = useDrawerContext()
      props.children = typeof children === 'function' ? children(transition) : children
      props.css = props.css ? [transition.css, props.css] : transition.css
      props.ref = ref
      return portalize(createElement('div', props), portal)
    }
  ),
  Drawer = props => (props.transition || Slide)(
    withChildren(
      props,
      transition => <Provider value={transition} children={props.children(transition)}/>
    )
  )

if (__DEV__) {
  const slidePropTypes = require('../Slide/propTypes').default
  Drawer.displayName = 'Drawer'
  DrawerBox.displayName = 'DrawerBox'
  Drawer.propTypes = slidePropTypes
}

export default Drawer
