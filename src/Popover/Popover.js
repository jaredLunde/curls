import React, {useRef, useContext, useState, useEffect, useLayoutEffect, useCallback, useMemo} from 'react'
import {css} from '@emotion/core'
import useWindowSize from '@react-hook/window-size'
import useWindowScroll from '@react-hook/window-scroll'
import emptyArr from 'empty/array'
import emptyObj from 'empty/object'
import {useBreakpoint} from '../Breakpoint'
import {useBox} from '../Box'
import {pos} from '../Box/styles'
import {flex} from '../Flex/styles'
import Drop from '../Drop'
import {portalize, objectWithoutProps, withChildren, loadImages} from '../utils'
import * as defaultTheme from './defaultTheme'
import {setDirectionStyle} from './utils'
import createElement from '../createElement'
import useStyles from '../useStyles'


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
const
  PopoverContext = React.createContext(emptyObj),
  {Consumer, Provider} = PopoverContext
export const
  PopoverConsumer = Consumer,
  usePopover = () => useContext(PopoverContext)
const
  defaultCSS = css([flex, pos.fixed, `z-index: 1001;`]),
  options = {name: 'popover', defaultTheme},
  withoutPortal = {portal: 0, children: 0},
  withoutPop = {popoverBoxRef: 0, style: 0}

export const PopoverBox = React.forwardRef(
  (props, ref) => {
    const {children, portal} = props
    props = objectWithoutProps(props, withoutPortal)
    props = useBox(useStyles(props, options))
    const pop = usePopover()
    props.children = typeof children === 'function'
      ? children(objectWithoutProps(pop, withoutPop))
      : children
    props.css = props.css ? [pop.css, props.css] : pop.css
    props.style = Object.assign({}, pop.style, props.style)
    props.ref = ref === null ? pop.popoverBoxRef : el => {
      if (typeof innerRef === 'function')
        innerRef(el)
      else if (typeof innerRef === 'object' && innerRef.current !== void 0)
        innerRef.current = el
      pop.popoverBoxRef.current = el
    }
    return portalize(createElement('div', props, defaultCSS), portal)
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
    useLayoutEffect(
      () => {
        props.isVisible === true && reposition()
        // cancels image loading on unmnount
        return () => imageLoader.current && imageLoader.current.cancel()
      },
      emptyArr
    )
    // repositions when visibility changes
    useLayoutEffect(() => {props.isVisible === true && reposition()}, [props.isVisible])
    // repositions when scrollY, width, or height changes
    useLayoutEffect(
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
    (next.isVisible === false && prev.isVisible === false && prev.children === next.children) || (
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
  let keys = Object.keys(props), i = keys.length -1
  for (; i > -1 ; i--) {
    const key = keys[i]
    if (positions.has(key) === true && !!props[key])
      return key
  }
  return 'fromBottom'
}

const BreakpointRenderer = ({popoverProps, breakpoints}) => {
  let
    checkBreakpoints = {},
    i = 0,
    keys =  Object.keys(breakpoints)

  for (; i < keys.length; i++)
    checkBreakpoints[keys[i]] = true

  const {matches} = useBreakpoint(checkBreakpoints)
  popoverProps.popoverDirection = 'fromBottom'
  const matchKeys = Object.keys(matches)

  for (i = matchKeys.length - 1; i > -1; i--) {
    const key = matchKeys[i]
    if (matches[key] === true) {
      popoverProps.popoverDirection = breakpoints[key]
      break
    }
  }

  return ViewportPopover(popoverProps)
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
            popoverProps.popoverDirection = getDirection(props)
            return ViewportPopover(popoverProps)
          }

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
