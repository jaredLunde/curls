import React from 'react'
import {cx, css} from 'emotion'
import {baseIsNotVisible, baseIsVisible} from '../Fade/CSS'
import {flex, align, justify} from '../Flex/CSS'
import {pos, w, h, ov} from '../Box/CSS'
import {FlexBox} from '../Box'
import Fade from '../Fade'
import * as defaultTheme from './defaultTheme'
import {maxZIndex} from '../global'
import createComponent, {renderNode} from '../createComponent'

/**
<Modal>
  {
    ({ModalBox, show, hide, toggle, isVisible}) => (
      <>
        <Overlay visible={isVisible}>
          {function (overlayProps) {
            return ModalBox({
              p: 4,
              children: function ({show, hide, toggle, isVisible}) {
                return (
                  <Type color='black'>
                    Im a overlay

                    <Button onClick={hide}>
                      Close
                    </Button>
                  </Type>
                )
              }
            })
          }}
        </Overlay>

        <Button md onClick={toggle}>
          Get yours today
        </Button>
      </>
    )
  }
</Modal>
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
  function Overlay ({transition = Fade, ...props}, innerRef) {
    return transition({
      ...props,
      children: function (sfcProps) {
        return SFC({
          innerRef,
          ...sfcProps,
          children: function (boxProps) {
            return FlexBox({
              ...boxProps,
              children: function ({isVisible, show, hide, toggle, ...overlayBoxProps}) {
                overlayBoxProps.nodeType = overlayBoxProps.nodeType || nodeType
                overlayBoxProps.children = props.children({isVisible, show, hide, toggle})

                return renderNode(overlayBoxProps, defaultCSS)
              }
            })
          }
        })
      }
    })
  }
)
