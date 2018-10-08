import React from 'react'
import {cx} from 'emotion'
import {baseIsNotVisible, baseIsVisible} from '../Fade/CSS'
import {flex, align, justify} from '../Flex/CSS'
import {pos, w, h} from '../Box/CSS'
import Box, {FlexBox} from '../Box'
import Drop from '../Drop'
import * as defaultTheme from './defaultTheme'
import {maxZIndex} from '../global'
import createComponent, {renderNode} from '../createComponent'

/**
<Modal>
  {
    ({ModalBox, show, hide, toggle, isVisible, className}) => (
      <>
        <div clasName={className}>
          {ModalBox({
            p: 4,
            children: function ({show, hide, toggle, isVisible}) {
              return (
                <Type color='black'>
                  Im a modal

                  <Button onClick={hide}>
                    Close
                  </Button>
                </Type>
              )
            }
          })}
        </div>

        <Button md onClick={toggle}>
          Get yours today
        </Button>
      </>
    )
  }
</Modal>
**/
const nodeType = 'div'
const SFC = createComponent({name: 'Modal', defaultTheme, themePath: 'modal'})


export default React.forwardRef(
  function Modal ({...props}, innerRef) {
    const transition = props.transition || Drop
    const childComponent = props.children

    props.children = function (modalProps) {
      const classNameFromTransition = modalProps.className
      delete modalProps.className
      // Box component passed to the child function
      modalProps.ModalBox = function ModalBox (sfcProps) {
        return SFC({
          innerRef,
          ...sfcProps,
          children: function (boxProps) {
            return FlexBox({
              ...boxProps,
              className: modalProps.isVisible && baseIsVisible,
              children: function (modalBoxProps) {
                modalBoxProps.nodeType = modalBoxProps.nodeType || nodeType
                modalBoxProps.className = cx(
                  classNameFromTransition,
                  boxProps.className,
                  modalBoxProps.className
                )
                modalBoxProps.children = sfcProps.children({
                  isVisible: modalProps.isVisible,
                  show: modalProps.show,
                  hide: modalProps.hide,
                  toggle: modalProps.toggle
                })

                return renderNode(modalBoxProps)
              }
            })
          }
        })

      }

      return childComponent(modalProps)
    }

    return transition(props)
  }
)
