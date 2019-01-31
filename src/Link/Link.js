import React from 'react'
import {CurlsContext} from '../ThemeProvider'
import A from './A'

// TODO: get Link component from Theme
export default React.forwardRef(
  function Link (props, innerRef) {
    return <CurlsContext.Consumer children={
      cxt => {
        if (__DEV__) {
          if (!cxt.theme?.link?.component) {
            throw 'You must define a `component` property in your `theme.link` to use the Link component'
          }
        }

        return <A as={cxt.theme.link.component} ref={innerRef} {...props}/>
      }
    }/>
  }
)
