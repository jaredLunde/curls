import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'
import {css} from '@emotion/core'
import {createElement, useStyles} from '@style-hooks/core'
import useWindowSize from '@react-hook/window-size/throttled'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import useMergedRef from '@react-hook/merged-ref'
import useSwitch from '@react-hook/switch'
import emptyArr from 'empty/array'
import {useBox} from '../Box'
import {useFade} from '../Fade'
import useScroll from '../useScroll'
import useBreakpointValueParser from '../useBreakpointValueParser'
import {portalize, objectWithoutProps, pushCss} from '../utils'
import {setPlacementStyle} from './utils'
import emptyObj from 'empty/object'

export const PopoverContext = React.createContext({}),
  {Consumer: PopoverConsumer} = PopoverContext,
  usePopoverContext = () => useContext(PopoverContext)

const defaultStyles = css`
    display: flex;
    position: fixed;
    z-index: 1001;
  `,
  withoutPop = {ref: 0, triggerRef: 0, style: 0}

const defaultTransition = ({isOpen /*, placement*/}) =>
  useFade({visible: isOpen, from: 0, to: 1})

export const usePopoverBox = props => {
    const popover = usePopoverContext()
    props = useStyles(
      'popover',
      emptyObj,
      pushCss(props, [defaultStyles, popover.css])
    )
    props.id = props.id || popover.id
    props.tabIndex = props.tabIndex || '0'
    const {css} = (props.transition || defaultTransition)({
      isOpen: popover.isOpen,
      placement: popover.placement,
    })
    delete props.transition
    props.css = props.css
      ? [defaultStyles, css].concat(props.css)
      : [defaultStyles, css]
    props.style = props.style
      ? Object.assign({}, popover.style, props.style)
      : popover.style
    return props
  },
  PopoverBox = React.forwardRef((props_, ref) => {
    const {placement = 'bottom', portal, children, ...props} = useBox(
      usePopoverBox(props_)
    )
    const matches = useBreakpointValueParser(placement)
    const popover = usePopoverContext()
    // handles repositioning the popover
    // Yes this is correct, it's useEffect, not useLayoutEffect
    // Just move on.
    useEffect(() => {
      if (typeof placement === 'function') {
        popover.reposition(placement)
      } else if (matches) {
        popover.reposition(matches.filter(match => match.matches).pop().value)
      }
    }, [placement, matches])
    // handles closing the popover when the ESC key is pressed
    useLayoutEffect(() => {
      if (popover.isOpen) {
        setTimeout(() => popover.ref.current.focus(), 100)
        const callback = event =>
          parseInt(event.keyCode) === 27 && popover.close()
        popover.ref.current.addEventListener('keyup', callback)
        return () => popover.ref.current.removeEventListener('keyup', callback)
      }
    }, [popover.isOpen])

    props.ref = useMergedRef(popover.ref, ref)
    props.children =
      typeof children === 'function'
        ? children(objectWithoutProps(popover, withoutPop))
        : children

    return portalize(createElement('div', props), portal)
  })

let ID = 0
const PopoverContainer = React.memo(
  ({
    open,
    close,
    toggle,
    isOpen,
    containIn,
    containStrategy,
    windowSize,
    scrollY,
    children,
  }) => {
    const triggerRef = useRef(null),
      popoverRef = useRef(null),
      id = useRef(`curls.popover.${ID++}`).current,
      [{style, requestedPlacement, placement}, setState] = useState({
        style: {},
        placement: null,
        requestedPlacement: null,
      }),
      reposition = useCallback(
        nextPlacement => {
          setState(
            setPlacementStyle(
              nextPlacement,
              triggerRef.current,
              popoverRef.current,
              containIn,
              containStrategy
            )
          )
        },
        [containIn, containStrategy]
      ),
      childContext = useMemo(
        () => ({
          isOpen,
          open,
          close,
          toggle,
          id,
          style,
          ref: popoverRef,
          placement,
          reposition,
          triggerRef,
        }),
        [isOpen, open, close, toggle, placement, reposition, style]
      )

    useEffect(() => {
      isOpen && reposition(requestedPlacement)
    }, [isOpen, reposition, scrollY, windowSize[0], windowSize[1]])

    return (
      <PopoverContext.Provider
        value={childContext}
        children={
          typeof children === 'function' ? children(childContext) : children
        }
      />
    )
  },
  (prev, next) =>
    // bails out if the popover is closed and was closed
    // and the children didn't change
    (next.isOpen === false &&
      prev.isOpen === false &&
      prev.children === next.children) ||
    // bails out if all else is equal
    (prev.children === next.children &&
      prev.isOpen === next.isOpen &&
      prev.windowSize[0] === next.windowSize[0] &&
      prev.windowSize[1] === next.windowSize[1] &&
      prev.scrollY === next.scrollY &&
      prev.containIn === next.containIn &&
      prev.containStrategy === next.containStrategy)
)

export const PopoverMe = props => {
  const {children, on, tabIndex} = props
  const matches = useBreakpointValueParser(on),
    {isOpen, open, close, toggle, id} = usePopoverContext(),
    elementRef = useRef(null),
    ref = useMergedRef(usePopoverContext().triggerRef, elementRef),
    seen = useRef(false)

  // returns the focus to the trigger when the popover box closes if focus is
  // not an event that triggers opening the popover
  useLayoutEffect(() => {
    if (isOpen === false) {
      if (seen.current === true) {
        let isTriggeredByFocus = false

        for (let match of matches)
          if (match.matches === true && match.value === 'focus') {
            isTriggeredByFocus = true
            break
          }

        if (!isTriggeredByFocus) elementRef.current.focus()
      }
      seen.current = true
    }
  }, [isOpen])

  // handles trigger events
  useLayoutEffect(() => {
    if (elementRef.current && Array.isArray(matches)) {
      const listeners = []
      const addListener = (...args) => {
        listeners.push(args)
        elementRef.current.addEventListener(...args)
      }

      for (let match of matches) {
        if (match.matches === true) {
          switch (match.value) {
            case 'hover':
              addListener('mouseenter', open)
              addListener('mouseleave', close)
              break

            case 'focus':
              addListener('focus', open)
              // addListener('blur', close)
              break

            case 'click':
              addListener('click', e => {
                e.stopPropagation()
                toggle()
              })
              break
          }
        }
      }

      return () => {
        listeners.forEach(args =>
          elementRef.current.removeEventListener(...args)
        )
      }
    }
  }, [elementRef.current, matches, open, close, toggle])

  return React.cloneElement(children, {
    tabIndex:
      children.props.tabIndex ||
      (typeof tabIndex === 'string' ? tabIndex : undefined),
    'aria-controls': props['aria-controls'] || id,
    'aria-haspopup': 'true',
    'aria-expanded': String(isOpen),
    ref,
  })
}

const ScrollPositioner = props =>
  React.createElement(
    PopoverContainer,
    Object.assign(
      {
        scrollY: useScroll(
          props.containIn,
          props.repositionOnScroll === true ? 30 : props.repositionOnScroll
        ),
      },
      props
    )
  )

const ResizePositioner = props => {
  props = Object.assign({}, props)
  props.windowSize = useWindowSize(1280, 720, {
    fps: props.repositionOnResize === true ? 30 : props.repositionOnResize,
  })

  return React.createElement(
    props.repositionOnScroll ? ScrollPositioner : PopoverContainer,
    props
  )
}

export const Popover = ({
  open,
  initialOpen,
  repositionOnResize = 0,
  repositionOnScroll = 0,
  containIn = typeof document !== 'undefined' && document.documentElement,
  containStrategy = 'flip',
  children,
}) => {
  let [isOpen, toggle] = useSwitch(initialOpen)
  isOpen = open === void 0 || open === null ? isOpen : open
  return React.createElement(
    repositionOnResize
      ? ResizePositioner
      : repositionOnScroll
      ? ScrollPositioner
      : PopoverContainer,
    {
      children,
      open: toggle.on,
      close: toggle.off,
      toggle,
      isOpen,
      containIn,
      containStrategy,
      windowSize: emptyArr,
      repositionOnResize,
      repositionOnScroll,
    }
  )
}

if (__DEV__) {
  Popover.displayName = 'Popover'
  PopoverBox.displayName = 'PopoverBox'
}
