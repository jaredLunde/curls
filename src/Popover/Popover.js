import React from 'react'
import {css} from '@emotion/core'
import {ViewportSize, default as Viewport} from '@render-props/viewport'
import {loadImages} from '@render-props/image-props'
import {strictShallowEqual} from '@render-props/utils'
import emptyObj from 'empty/object'
import Breakpoint from '../Breakpoint'
import {MAX_Z_INDEX} from '../browser'
import {FlexBox} from '../Box'
import {pos} from '../Box/styles'
import {flex} from '../Flex/styles'
import Drop from '../Drop'
import {portalize} from '../utils'
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
const as = 'div'
const SFC = createComponent({name: 'popover', defaultTheme})

export const PopoverBox = React.forwardRef(
  function PopoverBox ({children, portal, ...props}, innerRef) {
    return (
      <Consumer children={
        function ({css: boxCSS, popoverBoxRef, style, ...transitionProps}) {
          const boxChild =
            typeof children === 'function' ? children(transitionProps) : children

          const innerRef_ = innerRef === null ? popoverBoxRef : function (...args) {
            innerRef(...args)
            popoverBoxRef(...args)
          }

          let Component = SFC({
            ...props,
            css: [boxCSS, props.css],
            children: sfcProps => FlexBox({
              ...sfcProps,
              children: function (boxProps) {
                boxProps.as = boxProps.as || as
                boxProps.children = boxChild
                boxProps.innerRef = innerRef_
                boxProps.style = {...style, ...boxProps.style}
                return renderNode(boxProps, defaultCSS)
              }
            })
          })

          return portalize(Component, portal)
        }
      }/>
    )
  }
)

class PopoverContainer extends React.Component {
  imageLoader = null
  container = null
  state = {}

  constructor (props) {
    super(props)
    this.popoverContext = {
      isVisible: props.isVisible,
      show: props.show,
      hide: props.hide,
      toggle: props.toggle,
      renderPosition: this.state.renderPosition,
      reposition: this.reposition,
      popoverRef: this.setContainerRef
    }
    this.popoverBoxContext = {
      ...this.popoverBoxContext,
      className: props.className,
      popoverBoxRef: this.setPopoverBoxRef
    }
    delete this.popoverBoxContext.popoverRef
  }

  componentDidMount () {
    if (this.props.isVisible === true) {
      this.reposition()
    }
  }

  componentDidUpdate ({width, height, scrollY, isVisible}) {
    if ((
      this.props.isVisible === true
      && this.props.isVisible !== isVisible
    ) || (
      width !== this.props.width
      || height !== this.props.height
    ) || (
      this.props.isVisible === true && scrollY !== this.props.scrollY
    )) {
      this.reposition()
    }
  }

  componentWillUnmount () {
    if (this.imageLoader !== null) {
      this.imageLoader.cancel()
    }
  }

  shouldComponentUpdate ({scrollY, width, height, ...nextProps}, nextState) {
    if (
      this.props.isVisible === true/* || this.state.hasRendered === true*/ && (
        width !== this.props.width || height !== this.props.height
        || scrollY !== this.props.scrollY
      )
    ) {
      return true
    }

    const prevProps = {...this.props}
    delete prevProps.width
    delete prevProps.height
    delete prevProps.scrollY

    return (
      !strictShallowEqual(nextState, this.state)
      || !strictShallowEqual(nextProps, prevProps)
    )
  }

  setContainerRef = el => this.container = el
  setPopoverBoxRef = el => this.popoverBox = el

  setPositionState = () => {
    let {popoverDirection, theme, width, height} = this.props
    this.setState(
      setDirectionStyle(popoverDirection, this.container, this.popoverBox, {width, height})
    )
  }

  reposition = () => {
    this.imageLoader = loadImages(this.popoverBox)
    this.imageLoader.then(
      () => {
        this.setPositionState()
        this._loader = null
      }
    )

    this.setPositionState()
  }

  render () {
    const {renderPosition, ...style} = this.state

    if (
      this.props.isVisible !== this.popoverContext.isVisible
      || this.state.renderPosition !== this.popoverContext.renderPosition
      || this.props.css !== this.popoverBoxContext.css
    ) {
      this.popoverContext = {
        ...this.popoverContext,
        renderPosition,
        isVisible: this.props.isVisible,
        popoverRef: this.setContainerRef
      }
    }

    this.popoverBoxContext = {
      ...this.popoverContext,
      style,
      css: this.props.css,
      popoverBoxRef: this.setPopoverBoxRef
    }
    delete this.popoverBoxContext.popoverRef

    return (
      <Provider value={this.popoverBoxContext}>
        {this.props.children(this.popoverContext)}
      </Provider>
    )
  }
}


function ViewportPopover (props) {
  const children = vpProps => {
    props.width = vpProps.width
    props.height = vpProps.height

    if (props.repositionOnScroll) {
      props.scrollY = vpProps.scrollY
    }

    if (props.innerRef) {
      props.ref = props.innerRef
      delete props.innerRef
    }

    return React.createElement(PopoverContainer, props)
  }

  // props here can be safely mutated
  return (props.repositionOnScroll ? Viewport : ViewportSize)({children})
}

const positions = ['fromTop', 'fromRight', 'fromBottom', 'fromLeft']
const ws = /\s+/

function getBreakpoints (props) {
  let keys = Object.keys(props),
      hasBreakpoints = false,
      breakpoints = {},
      i = 0,
      j

  for (; i < keys.length; i++) {
    const key = keys[i]

    if (positions.indexOf(key) > -1) {
      if (typeof props[key] !== 'string') {
        continue
      }

      const valPairs = props[key].split(ws)

      for (j = 0; j < valPairs.length; j++) {
        const valPair = valPairs[j]
        const indexOfSplit = valPair.indexOf('@')

        if (indexOfSplit > -1) {
          breakpoints[valPair.substring(indexOfSplit + 1)] = key
          hasBreakpoints = true
        }
      }
    }
  }

  return hasBreakpoints && breakpoints
}

function getDirection (props) {
  let keys = Object.keys(props),
      i = keys.length -1

  for (; i > -1 ; i--) {
    const key = keys[i]

    if (positions.indexOf(key) > -1 && !!props[key]) {
      return key
    }
  }
}

class BreakpointRenderer extends React.Component {
  state = {mounted: false}

  componentDidMount () {
    this.setState({mounted: true})
  }

  render () {
    let {popoverProps} = this.props
    let breakpoints = {}, i
    const keys =  Object.keys(this.props.breakpoints)

    for (i = 0; i < keys.length; i++) {
      breakpoints[keys[i]] = true
    }

    return (
      <Breakpoint key={this.state.mounted} {...breakpoints}>
        {({matches}) => {
          popoverProps.popoverDirection = 'fromBottom'

          for (i = keys.length - 1; i > -1; i--) {
            const key = keys[i]

            if (matches[key] === true) {
              popoverProps.popoverDirection = this.props.breakpoints[key]
              break
            }
          }

          return ViewportPopover(popoverProps)
        }}
      </Breakpoint>
    )
  }
}

const Popover = React.forwardRef(
  function Popover (props, innerRef) {
    const breakpoints = getBreakpoints(props)

    return (props.transition || Drop)({
      ...props,
      children: popoverProps => {
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
    })
  }
)

export default Popover