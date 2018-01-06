import React from 'react'
import {cx, css} from 'emotion'
import createOptimized from 'react-cake/es/utils/createOptimized'
import {baseIsNotVisible, baseIsVisible} from '../Fade/CSS'
import {flex, align, justify} from '../Flex/CSS'
import {pf, fw, fh, touchScrolling} from '../Box/CSS'
import {FlexBox} from '../Box'
import Drop from '../Drop'
import defaultTheme from './defaultTheme'
import {getComponentTheme} from '../utils'
import {maxZIndex} from '../global'


/**
<Modal transitionType={Fade}>
  {
    ({ModalBox, show, hide, toggle, isVisible}) => (
      <Hero bg='black'>
        {ModalBox({
          p: 4,
          children: function ({show, hide, toggle, isVisible}) {
            return (
              <Type black>
                Im a modal</br>

                <Button onClick={hide}>
                  Close
                </Button>
              </Type>
            )
          }
        })}

        <Button md onClick={toggle}>
          Get yours today
        </Button>
      </Hero>
    )
  }
</Modal>
**/
const themePath = 'modal'
const fixedContainer = css`
  ${baseIsNotVisible};
  ${maxZIndex};
  ${flex};
  ${align.center};
  ${justify.center};
  ${pf};
  ${fw};
  ${fh};
  ${touchScrolling};
  left: 0;
  top: 0;
  overflow: auto;
`


export default function Modal ({children, transitionType = Drop, theme, ...props}) {
  theme = getComponentTheme(defaultTheme, theme, themePath)

  return transitionType({
    ...props,
    children: function ({isVisible, show, hide, toggle, className, ...modalProps}) {
      const modalClassName = className

      function ModalBox ({nodeType = 'div', children, ...boxProps}) {
        return FlexBox({
          /**
          flex: true,
          align: 'center',
          justify: 'center',
          pf: true,
          fw: true,
          fh: true,
          touchScrolling: true,
          */
          className: cx(fixedContainer, isVisible && baseIsVisible),
          children: function (box2Props) {
            return FlexBox({
              p: theme.defaultPadding,
              bg: theme.defaultBg,
              br: theme.defaultBorderRadius,
              bc: theme.defaultBorderColor,
              bw: theme.defaultBorderWidth,
              bs: theme.defaultBoxShadow,
              ...boxProps,
              children: function ({className, ...containerProps}) {
                return (
                  <div {...box2Props}>
                    {createOptimized(
                      nodeType,
                      {
                        className: cx(className, modalClassName),
                        ...containerProps
                      },
                      children({
                        isVisible,
                        show,
                        hide,
                        toggle
                      })
                    )}
                  </div>
                )
              }
            })
          }
        })
      }

      return createOptimized(
        children,
        {
          ModalBox,
          isVisible,
          show,
          hide,
          toggle,
          ...modalProps
        }
      )
    }
  })
}
