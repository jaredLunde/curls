import React from 'react'
import {CurlsContext} from '../ThemeProvider'
import A from './A'

export default React.forwardRef(
  function NavLink (props, innerRef) {
    return <CurlsContext.Consumer children={
      cxt => {
        if (__DEV__) {
          if (!cxt.theme?.link?.navComponent) {
            throw 'You must define a `navComponent` property in your `theme.link` to use the Link component'
          }
        }

        return <A as={cxt.theme.link.navComponent} ref={innerRef} {...props}/>
      }
    }/>
  }
)
