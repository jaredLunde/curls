import React from 'react'
import {css} from '@emotion/core'
import Portalize from 'react-portalize'
import {withChildren} from '../utils'
import {baseIsNotVisible} from '../Fade/styles'
import {flex, align, justify} from '../Flex/styles'
import {pos, ov} from '../Box/styles'
import {FlexBox} from '../Box'
import Fade from '../Fade'
import * as defaultTheme from './defaultTheme'
import {MAX_Z_INDEX} from '../browser'
import createComponent, {renderNode} from '../createComponent'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


/**
<Overlay visible={isVisible}>
  {function ({isVisible, show, hide, toggle}) {

  }}
</Overlay>
**/
const as = 'div'
const defaultCSS = css`
  ${baseIsNotVisible};
  ${flex};
  ${align.center};
  ${justify.center};
  ${pos.fixed};
  ${ov.auto};
  ${ov.touch};
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: ${MAX_Z_INDEX - 1};
`
const SFC = createComponent({name: 'overlay', defaultTheme})

const Overlay = React.forwardRef(
  ({transition = Fade, portal = false, ...props}, innerRef) => transition(
    withChildren(
      props,
      sfcProps => {
        sfcProps = withChildren(
          sfcProps,
          boxProps => FlexBox(
            withChildren(
              boxProps,
              ({isVisible, show, hide, toggle, ...overlayBoxProps}) => {
                overlayBoxProps.as = overlayBoxProps.as || as
                overlayBoxProps.children =
                  typeof props.children === 'function'
                    ? props.children({isVisible, show, hide, toggle})
                    : props.children

                return renderNode(overlayBoxProps, defaultCSS)
              }
            )
          )
        )

        sfcProps.innerRef = innerRef
        const Component = SFC(sfcProps)

        return portal === false
          ? Component
          : <Portalize
              children={Component}
              entry={typeof portal === 'function' ? portal : void 0}
            />
      }
    )
  )
)

Overlay.propTypes /* remove-proptypes */ = Object.assign({}, boxPropTypes, flexPropTypes)
export default Overlay