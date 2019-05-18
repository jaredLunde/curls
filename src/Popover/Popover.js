import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react'
import {css} from '@emotion/core'
import useWindowSize from '@react-hook/window-size'
import useWindowScroll from '@react-hook/window-scroll'
import {loadImages} from '@render-props/image-props'
import emptyArr from 'empty/array'
import emptyObj from 'empty/object'
import Breakpoint from '../Breakpoint'
import {MAX_Z_INDEX} from '../browser'
import {FlexBox} from '../Box'
import {pos} from '../Box/styles'
import {flex} from '../Flex/styles'
import Drop from '../Drop'
import {portalize, objectWithoutProps, withChildren} from '../utils'
import * as defaultTheme from './defaultTheme'
import {setDirectionStyle} from './utils'
import createComponent, {renderNode} from '../createComponent'


/**
 import {Popover, PopoverBox} from 'curls'
 <Popover fromRight enterDelay={600} leaveDelay={150}>
 {function ({popoverRef, renderPosition, show, hide, ...props}) {
    return (
      <div>
        <PopoverBox
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <Type bold color='black'>Hello</Type>
        </PopoverBox>
        <Button ref={popoverRef} onMouseEnter={show} onMouseLeave={hide}>
          Hover me
        </Button>
      </div>
    )
  }}
 </Popover>
 */
const {Consumer, Provider} = React.createContext(emptyObj)
export const PopoverConsumer = Consumer
const defaultCSS = css`
  ${flex};
  ${pos.fixed};
  z-index: ${MAX_Z_INDEX};
`
const
  as = 'div',
  SFC = createComponent({name: 'popover', defaultTheme}),
  withoutPortal = {portal: 0, children: 0},
  withoutConsumer = {css: 0, popoverBoxRef: 0, style: 0}
export const PopoverBox = React.forwardRef(
  (props, innerRef) => {
    const {children, portal} = props
    props = objectWithoutProps(props, withoutPortal)

    return <Consumer children={
      transitionProps => {
        const
          {css: boxCss, popoverBoxRef, style} = transitionProps,
          boxChild = typeof children === 'function'
            ? children(objectWithoutProps(transitionProps, withoutConsumer))
            : children

        const innerRef_ = innerRef === null ? popoverBoxRef : el => {
          if (typeof innerRef === 'function')
            innerRef(el)
          else if (typeof innerRef === 'object' && innerRef.current !== void 0)
            innerRef.current = el

          popoverBoxRef.current = el
        }

        props.children = sfcProps => {
          sfcProps.children = boxProps => {
            boxProps.as = boxProps.as || as
            boxProps.children = boxChild
            boxProps.innerRef = innerRef_
            boxProps.style = Object.assign({}, style, boxProps.style)
            return renderNode(boxProps, defaultCSS)
          }

          return FlexBox(sfcProps)
        }
        props.css = boxCss
        return portalize(SFC(props), portal)
      }
    }/>
  }
)

const PopoverContainer = React.memo(
  props => {
    const
      imageLoader = useRef(null),
      container = useRef(null),
      popoverBox = useRef(null),
      [state, setState] = useState({})

    const reposition = useCallback(
      () => {
        const setPositionState = () => {
          setState(
            setDirectionStyle(
              props.popoverDirection,
              container.current,
              popoverBox.current,
              {width: props.width, height: props.height}
            )
          )
        }

        imageLoader.current = loadImages(popoverBox.current)
        imageLoader.current.then(setPositionState)
        setPositionState()
      },
      [props.width, props.height, props.popoverDirection]
    )
    // repositions on mount if initially visible
    useEffect(
      () => {
        props.isVisible === true && reposition()
        // cancels image loading on unmnount
        return () => imageLoader.current && imageLoader.current.cancel()
      },
      emptyArr
    )
    // repositions when visibility changes
    useEffect(() => {props.isVisible === true && reposition()}, [props.isVisible])
    // repositions when scrollY, width, or height changes
    useEffect(
      () => {props.isVisible === true && reposition()},
      [props.width, props.height, props.scrollY]
    )

    const childContext = useMemo(
      () => ({
        isVisible: props.isVisible,
        show: props.show,
        hide: props.hide,
        toggle: props.toggle,
        renderPosition: state.renderPosition,
        popoverRef: container,
        reposition,
      }),
      [props.isVisible, state.renderPosition, reposition]
    )

    const boxContext = useMemo(
      () => {
        const cxt = objectWithoutProps(childContext, {popoverRef: 0})
        cxt.css = props.css
        cxt.popoverBoxRef = popoverBox
        cxt.style = {
          top: state.top,
          right: state.right,
          bottom: state.bottom,
          left: state.left
        }
        return cxt
      },
      [childContext, state.top, state.right, state.bottom, state.left]
    )

    return <Provider value={boxContext} children={props.children(childContext)}/>
  },
  (prev, next) => (
    (next.isVisible === false && prev.isVisible === false) || (
      prev.children === next.children
      && prev.width === next.width
      && prev.height === next.height
      && prev.scrollY === next.scrollY
      && prev.popoverDirection === next.popoverDirection
      && prev.isVisible === next.isVisible
    )
  )
)

const sizeOpt = {wait: 240}
const ScrollPositioner = props => {
  props = Object.assign({}, props)
  const [width, height] = useWindowSize(1280, 720, sizeOpt)
  props.scrollY = useWindowScroll(15)
  props.width = width
  props.height = height

  if (props.innerRef) {
    props.ref = props.innerRef
    delete props.innerRef
  }

  return React.createElement(PopoverContainer, props)
}

const SizePositioner = props => {
  props = Object.assign({}, props)
  const [width, height] = useWindowSize(1280, 720, sizeOpt)
  props.width = width
  props.height = height

  if (props.innerRef) {
    props.ref = props.innerRef
    delete props.innerRef
  }

  return React.createElement(PopoverContainer, props)

}

const ViewportPopover = props => React.createElement(
  props.repositionOnScroll ? ScrollPositioner : SizePositioner,
  props
)

const positions = new Set(['fromTop', 'fromRight', 'fromBottom', 'fromLeft'])
const ws = /\s+/

const getBreakpoints  = props => {
  let
    keys = Object.keys(props),
    hasBreakpoints = false,
    breakpoints = {},
    i = 0,
    j

  for (; i < keys.length; i++) {
    const key = keys[i]

    if (positions.has(key) === true) {
      if (typeof props[key] !== 'string') continue
      const valPairs = props[key].split(ws)

      for (j = 0; j < valPairs.length; j++) {
        const
          valPair = valPairs[j],
          indexOfSplit = valPair.indexOf('@')

        if (indexOfSplit > -1) {
          breakpoints[valPair.substring(indexOfSplit + 1)] = key
          hasBreakpoints = true
        }
      }
    }
  }

  return hasBreakpoints && breakpoints
}

const getDirection = props => {
  let
    keys = Object.keys(props),
    i = keys.length -1

  for (; i > -1 ; i--) {
    const key = keys[i]
    if (positions.has(key) === true && !!props[key])
      return key
  }
}

class BreakpointRenderer extends React.Component {
  state = {mounted: 'false'}

  componentDidMount () {
    this.setState({mounted: 'true'})
  }

  render () {
    let
      {popoverProps} = this.props,
      breakpoints = {},
      i = 0,
      keys =  Object.keys(this.props.breakpoints)

    for (; i < keys.length; i++)
      breakpoints[keys[i]] = true

    breakpoints.key = this.state.mounted
    breakpoints.children = ({matches}) => {
      popoverProps.popoverDirection = 'fromBottom'

      for (i = keys.length - 1; i > -1; i--) {
        const key = keys[i]
        if (matches[key] === true) {
          popoverProps.popoverDirection = this.props.breakpoints[key]
          break
        }
      }

      return ViewportPopover(popoverProps)
    }

    return React.createElement(Breakpoint, breakpoints)
  }
}

const Popover = React.forwardRef(
  (props, innerRef) => {
    const breakpoints = getBreakpoints(props)

    return (props.transition || Drop)(
      withChildren(
        props,
        popoverProps => {
          popoverProps.children = props.children
          popoverProps.innerRef = innerRef

          if (breakpoints === false) {
            popoverProps.popoverDirection = getDirection(props) || 'fromBottom'
            return ViewportPopover(popoverProps)
          }

          // this is here because react hydration is a complete piece of shit
          return <BreakpointRenderer
            props={props}
            popoverProps={popoverProps}
            breakpoints={breakpoints}
          />
        }
      )
    )
  }
)

export default Popover
