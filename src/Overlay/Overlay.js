import React from 'react'
import {cx, css} from 'emotion'
import Portalize from 'react-portalize'
import {baseIsNotVisible, baseIsVisible} from '../Fade/CSS'
import {flex, align, justify} from '../Flex/CSS'
import {pos, w, h, ov} from '../Box/CSS'
import {FlexBox} from '../Box'
import Fade from '../Fade'
import * as defaultTheme from './defaultTheme'
import {maxZIndex} from '../browser'
import createComponent, {renderNode} from '../createComponent'

/**
<Overlay visible={isVisible}>
  {function ({isVisible, show, hide, toggle}) {

  }}
</Overlay>
**/
const nodeType = 'div'
const defaultCSS = css`
  ${baseIsNotVisible};
  ${maxZIndex};
  ${flex};
  ${align.center};
  ${justify.center};
  ${pos.fixed};
  ${w('100%')};
  ${h('100%')};
  ${ov.auto};
  ${ov.touch}
  left: 0;
  top: 0;
`
const SFC = createComponent({name: 'Overlay', defaultTheme, themePath: 'overlay'})


export default React.forwardRef(
  function Overlay ({transition = Fade, portal = false, ...props}, innerRef) {
    return transition({
      ...props,
      children: function (sfcProps) {
        const Component = SFC({
          innerRef,
          ...sfcProps,
          children: function (boxProps) {
            return FlexBox({
              ...boxProps,
              children: function ({isVisible, show, hide, toggle, ...overlayBoxProps}) {
                overlayBoxProps.nodeType = overlayBoxProps.nodeType || nodeType
                overlayBoxProps.children =
                  typeof props.children === 'function'
                    ? props.children({isVisible, show, hide, toggle})
                    : props.children

                return renderNode(overlayBoxProps, defaultCSS)
              }
            })
          }
        })

        return (
          portal === false
            ? Component
            : <Portalize
                children={Component}
                entry={typeof portal === 'function' ? portal : void 0}
              />
        )
      }
    })
  }
)
