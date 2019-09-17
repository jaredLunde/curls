import React, {
  useRef,
  useContext,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
} from 'react'
import {css} from '@emotion/core'
import {createStyleHook, useTheme, createElement} from '@style-hooks/core'
import useWindowSize from '@react-hook/window-size'
import useWindowScroll from '@react-hook/window-scroll'
import emptyArr from 'empty/array'
import emptyObj from 'empty/object'
import {useBreakpoint} from '../Breakpoint'
import {useBox} from '../Box'
import {useFade} from '../Fade'
import {portalize, objectWithoutProps, loadImages} from '../utils'
import {setDirectionStyle} from './utils'

/**
 import {Popover, PopoverBox} from 'curls'
 <Popover fromRight enterDelay={600} leaveDelay={150}>
    {({renderPosition, show, hide, ...props}) => (
      <div>
        <PopoverBox
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <Text bold color='black'>Hello</Text>
        </PopoverBox>
        <PopoverMe>
          <Button onMouseEnter={show} onMouseLeave={hide}>
            Hover me
          </Button>
        </PopoverMe>
      </div>
    )}
 </Popover>
 */
export const PopoverContext = React.createContext(emptyObj),
  {Consumer: PopoverConsumer} = PopoverContext,
  usePopoverContext = () => useContext(PopoverContext)

const defaultStyles = css`
    display: flex;
    position: fixed;
    z-index: 1001;
  `,
  withoutPop = {popoverBoxRef: 0, style: 0}

export const usePopoverBox = createStyleHook('popover', {}),
  PopoverBox = React.forwardRef((props, ref) => {
    const {children, portal} = props
    props = useBox(usePopoverBox(props))
    delete props.portal
    delete props.children
    const pop = usePopoverContext()
    props.children =
      typeof children === 'function'
        ? children(objectWithoutProps(pop, withoutPop))
        : children
    props.css = props.css
      ? [defaultStyles, pop.css, ...props.css]
      : [defaultStyles, pop.css]
    props.style = Object.assign({}, pop.style, props.style)
    props.ref =
      ref === null
        ? pop.popoverBoxRef
        : el => {
            if (typeof ref === 'function') ref(el)
            else if (typeof ref === 'object' && ref.current !== void 0)
              ref.current = el
            pop.popoverBoxRef.current = el
          }
    return portalize(createElement('div', props), portal)
  })

const PopoverContainer = React.memo(
  props => {
    const imageLoader = useRef(null),
      container = useRef(null),
      popoverBox = useRef(null),
      [state, setState] = useState(null)

    const reposition = useCallback(() => {
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
    }, [props.width, props.height, props.popoverDirection])
    // repositions on mount if initially visible
    useLayoutEffect(() => {
      props.isVisible === true && reposition()
      // cancels image loading on unmnount
      return () => imageLoader.current && imageLoader.current.cancel()
    }, emptyArr)
    // repositions when visibility changes
    useLayoutEffect(() => {
      props.isVisible === true && reposition()
    }, [props.isVisible])
    // repositions when scrollY, width, or height changes
    useLayoutEffect(() => {
      props.isVisible === true && reposition()
    }, [props.width, props.height, props.scrollY])

    const childContext = useMemo(
      () => ({
        isVisible: props.isVisible,
        show: props.show,
        hide: props.hide,
        toggle: props.toggle,
        renderPosition: state?.renderPosition,
        popoverRef: container,
        reposition,
      }),
      [props.isVisible, state?.renderPosition, reposition]
    )

    const boxContext = useMemo(() => {
      const cxt = Object.assign({}, childContext)
      cxt.css = props.css
      cxt.popoverBoxRef = popoverBox
      cxt.style = {
        top: state?.top,
        right: state?.right,
        bottom: state?.bottom,
        left: state?.left,
      }
      return cxt
    }, [childContext, state?.top, state?.right, state?.bottom, state?.left])

    return (
      <PopoverContext.Provider
        value={boxContext}
        children={
          typeof props.children === 'function'
            ? props.children(childContext)
            : props.children
        }
      />
    )
  },
  (prev, next) =>
    (next.isVisible === false &&
      prev.isVisible === false &&
      prev.children === next.children) ||
    (prev.children === next.children &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.scrollY === next.scrollY &&
      prev.popoverDirection === next.popoverDirection &&
      prev.isVisible === next.isVisible)
)

export const PopoverMe = ({children}) =>
  React.cloneElement(children, {ref: usePopoverContext().popoverRef})

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

const positions = new Set([
  'fromCenter',
  'fromTop',
  'fromRight',
  'fromBottom',
  'fromLeft',
  'fromTopLeft',
  'fromTopRight',
  'fromRightTop',
  'fromRightBottom',
  'fromBottomLeft',
  'fromBottomRight',
  'fromLeftTop',
  'fromLeftBottom',
])
const ws = /\s+/

const getBreakpoints = (props, delim = '@') => {
  let keys = Object.keys(props),
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
        const valPair = valPairs[j],
          indexOfSplit = valPair.indexOf(delim)

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
  let keys = Object.keys(props),
    i = keys.length - 1

  for (; i > -1; i--) {
    const key = keys[i]
    if (positions.has(key) && !!props[key]) return key
  }

  return 'fromBottom'
}

export const Popover = React.forwardRef((props, innerRef) => {
  let theme = useTheme(),
    breakpoints = getBreakpoints(props, theme.breakpointsDelimiter),
    keys = Object.keys(props),
    i = 0,
    key,
    nextProps = {}

  for (; i < keys.length; i++) {
    key = keys[i]
    key = key.startsWith('fromTop')
      ? 'fromTop'
      : key.startsWith('fromRight')
      ? 'fromRight'
      : key.startsWith('fromLeft')
      ? 'fromLeft'
      : key.startsWith('fromBottom') || key === 'fromCenter'
      ? 'fromBottom'
      : key

    nextProps[key] = props[keys[i]]
  }

  const context = (props.transition || useFade)(nextProps)
  nextProps.innerRef = innerRef

  if (breakpoints === false) {
    nextProps.popoverDirection = getDirection(props)

    return React.createElement(
      nextProps.repositionOnScroll ? ScrollPositioner : SizePositioner,
      Object.assign(nextProps, context)
    )
  }

  let checkBreakpoints = {}
  keys = Object.keys(breakpoints)

  for (i = 0; i < keys.length; i++) checkBreakpoints[keys[i]] = true
  const {matches} = useBreakpoint(checkBreakpoints)
  nextProps.popoverDirection = 'fromBottom'
  const matchKeys = Object.keys(matches)

  for (i = matchKeys.length - 1; i > -1; i--) {
    const key = matchKeys[i]
    if (matches[key] === true) {
      nextProps.popoverDirection = breakpoints[key]
      break
    }
  }

  return React.createElement(
    nextProps.repositionOnScroll ? ScrollPositioner : SizePositioner,
    Object.assign(nextProps, context)
  )
})

if (__DEV__) {
  Popover.displayName = 'Popover'
  PopoverBox.displayName = 'PopoverBox'
}
